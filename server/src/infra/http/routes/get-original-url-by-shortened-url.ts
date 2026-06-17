import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getOriginalUrlByShortenedUrl } from '@/app/functions/get-original-url-by-shortened-url'
import { isRight, unwrapEither } from '@/shared/either'

export const getOriginalUrlByShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/shortened-urls/:shortenedUrl',
    {
      schema: {
        summary: 'Get original URL by shortened URL',
        tags: ['Shortened URLs'],
        params: z.object({
          shortenedUrl: z
            .string()
            .max(40)
            .regex(/^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/, {
              message:
                'The shortened URL must contain only letters, numbers and hyphens, without spaces or special characters',
            }),
        }),
        response: {
          200: z.object({
            originalUrl: z.url(),
          }),
          404: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortenedUrl } = request.params

      const result = await getOriginalUrlByShortenedUrl({ shortenedUrl })

      if (isRight(result)) return reply.status(200).send(result.right)

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'NotFoundError':
          return reply.status(404).send({ error: error.message })
        default:
          return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
