import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getShortenedUrls } from '@/app/functions/get-shortened-urls'
import { unwrapEither } from '@/shared/either'

export const getShortenedUrlsRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Get shortened URLs',
        tags: ['Links'],
        response: {
          200: z.array(
            z.object({
              id: z.uuidv7(),
              shortenedUrl: z.string(),
              originalUrl: z.url(),
              accessAmount: z.coerce.number(),
              createdAt: z.date(),
            })
          ),
        },
      },
    },
    async (_request, reply) => {
      const result = await getShortenedUrls()
      const { shortenedUrls } = unwrapEither(result)

      return reply.status(200).send(shortenedUrls)
    }
  )
}
