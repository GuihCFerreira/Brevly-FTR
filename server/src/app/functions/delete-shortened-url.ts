import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { NotFoundError } from '../errors/not-found-error'

const deleteShortenedUrlSchema = z.object({
  shortenedUrl: z.string().max(40),
})

type DeleteShortenedUrlInput = z.input<typeof deleteShortenedUrlSchema>

type DeleteShortenedUrlOutput = {
  shortenedUrl: string
}

export async function deleteShortenedUrl(
  input: DeleteShortenedUrlInput
): Promise<Either<NotFoundError, DeleteShortenedUrlOutput>> {
  const { shortenedUrl } = deleteShortenedUrlSchema.parse(input)

  const [originalUrlByShortenedUrl] = await db
    .select()
    .from(schema.shortenedUrls)
    .where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))
    .limit(1)

  if (!originalUrlByShortenedUrl) return makeLeft(new NotFoundError('Shortened URL not found'))

  await db.delete(schema.shortenedUrls).where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))

  return makeRight({
    shortenedUrl,
  })
}
