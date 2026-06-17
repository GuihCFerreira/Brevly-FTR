import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { stringify } from 'csv-stringify'
import { desc } from 'drizzle-orm'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { uploadFileToStorage } from '@/infra/storage/update-file-to-storage'
import { type Either, makeRight } from '@/shared/either'

type ExportShortenedUrlsReportOutput = {
  reportUrl: string
}

export async function exportShortenedUrlsReport(): Promise<
  Either<never, ExportShortenedUrlsReportOutput>
> {
  const { params, sql } = db
    .select({
      id: schema.shortenedUrls.id,
      shortenedUrl: schema.shortenedUrls.shortenedUrl,
      originalUrl: schema.shortenedUrls.originalUrl,
      accessAmount: schema.shortenedUrls.accessAmount,
      createdAt: schema.shortenedUrls.createdAt,
    })
    .from(schema.shortenedUrls)
    .orderBy(fields => desc(fields.createdAt))
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(50)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'original_url', header: 'Original URL' },
      { key: 'shortened_url', header: 'Shortened URL' },
      { key: 'access_amount', header: 'Access Count' },
      { key: 'created_at', header: 'Created At' },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], _encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }
        callback()
      },
    }),
    csv,
    uploadToStorageStream
  )

  const uploadToStorage = uploadFileToStorage({
    fileName: `${new Date().toISOString()}-shortened-urls-report.csv`,
    contentType: 'text/csv',
    folder: 'reports',
    contentStream: uploadToStorageStream,
  })

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

  return makeRight({ reportUrl: url })
}
