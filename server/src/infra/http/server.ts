import { fastifySwagger } from '@fastify/swagger'
import scalarUI from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from '@/env'
import { createShortenedUrlRoute } from './routes/create-shortened-url'
import { deleteShortenedUrlRoute } from './routes/delete-shortened-url'
import { exportShortenedUrlsReportRoute } from './routes/export-shortened-urls-report'
import { getOriginalUrlByShortenedUrlRoute } from './routes/get-original-url-by-shortened-url'
import { getShortenedUrlsRoute } from './routes/get-shortened-urls'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev-ly',
      description: 'API to shorten URLs',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(scalarUI, {
  routePrefix: '/docs',
  configuration: {
    layout: 'modern',
  },
})

server.get('/openapi.json', () => server.swagger())

server.register(getShortenedUrlsRoute)
server.register(getOriginalUrlByShortenedUrlRoute)
server.register(deleteShortenedUrlRoute)
server.register(createShortenedUrlRoute)
server.register(exportShortenedUrlsReportRoute)

server
  .listen({ port: env.PORT })
  .then(() => {
    console.log(`Server is running on port ${env.PORT}`)
  })
  .catch(err => {
    console.error('Error starting server:', err)
  })
