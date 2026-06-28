import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { exportShortenedUrlsReport } from '@/app/functions/export-shortened-urls-report'
import { unwrapEither } from '@/shared/either'

export const exportShortenedUrlsReportRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links/report',
    {
      schema: {
        summary: 'Export shortened URLs report',
        tags: ['Links'],
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (_request, reply) => {
      const result = await exportShortenedUrlsReport()
      const { reportUrl } = unwrapEither(result)
      return reply.status(200).send({ reportUrl })
    }
  )
}
