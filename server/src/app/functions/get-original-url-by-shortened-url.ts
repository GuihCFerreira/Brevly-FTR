import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { NotFoundError } from '../errors/not-found-error'

const getOriginalUrlByShortenedUrlSchema = z.object({
  shortenedUrl: z.string().max(40),
})

type GetOriginalUrlByShortenedUrlInput = z.input<typeof getOriginalUrlByShortenedUrlSchema>

type GetOriginalUrlByShortenedUrlOutput = {
  originalUrl: string
}

export async function getOriginalUrlByShortenedUrl(
  input: GetOriginalUrlByShortenedUrlInput
): Promise<Either<NotFoundError, GetOriginalUrlByShortenedUrlOutput>> {
  const { shortenedUrl } = getOriginalUrlByShortenedUrlSchema.parse(input)

  const [originalUrlByShortenedUrl] = await db
    .select()
    .from(schema.shortenedUrls)
    .where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))
    .limit(1)

  if (!originalUrlByShortenedUrl)
    return makeLeft(new NotFoundError('Original URL not found by shortened URL'))

  await db
    .update(schema.shortenedUrls)
    .set({
      accessAmount: originalUrlByShortenedUrl.accessAmount + 1,
    })
    .where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))

  return makeRight({
    originalUrl: originalUrlByShortenedUrl.originalUrl,
  })
}
