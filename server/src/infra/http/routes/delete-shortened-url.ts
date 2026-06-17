import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { deleteShortenedUrl } from '@/app/functions/delete-shortened-url'
import { isRight, unwrapEither } from '@/shared/either'

export const deleteShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/shortened-urls/:shortenedUrl',
    {
      schema: {
        summary: 'Delete shortened URL',
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
          204: z.null(),
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

      const result = await deleteShortenedUrl({ shortenedUrl })

      if (isRight(result)) return reply.status(204).send(null)

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
