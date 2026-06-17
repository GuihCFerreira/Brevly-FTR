import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { ConflictError } from '../errors/conflict-error'

const createShortenedUrlSchema = z.object({
  shortenedUrl: z
    .string()
    .max(40)
    .regex(/^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/),
  originalUrl: z.url(),
})

type CreateShortenedUrlInput = z.input<typeof createShortenedUrlSchema>

type CreateShortenedUrlOutput = {
  shortenedUrl: string
}

export async function createShortenedUrl(
  input: CreateShortenedUrlInput
): Promise<Either<ConflictError, CreateShortenedUrlOutput>> {
  const { shortenedUrl, originalUrl } = createShortenedUrlSchema.parse(input)

  const [existingUrl] = await db
    .select()
    .from(schema.shortenedUrls)
    .where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))

  if (existingUrl) {
    return makeLeft(new ConflictError('Shortened URL already exists'))
  }

  await db.insert(schema.shortenedUrls).values({
    shortenedUrl,
    originalUrl,
  })

  return makeRight({ shortenedUrl })
}
