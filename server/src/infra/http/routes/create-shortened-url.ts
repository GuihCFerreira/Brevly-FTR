import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createShortenedUrl } from '@/app/functions/create-shortened-url'
import { isRight, unwrapEither } from '@/shared/either'

export const createShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create a shortened URL',
        tags: ['Links'],
        body: z.object({
          shortenedUrl: z
            .string()
            .max(40)
            .regex(/^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/, {
              message:
                'The shortened URL must contain only letters, numbers and hyphens, without spaces or special characters',
            }),
          originalUrl: z.url(),
        }),
        response: {
          201: z.object({
            shortenedUrl: z.string(),
          }),
          400: z.object({
            error: z.string(),
          }),
          409: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortenedUrl, originalUrl } = request.body

      const result = await createShortenedUrl({ shortenedUrl, originalUrl })

      if (isRight(result)) return reply.status(201).send(result.right)

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'ValidationError':
          return reply.status(400).send({ error: error.message })
        case 'ConflictError':
          return reply.status(409).send({ error: error.message })
        default:
          return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
