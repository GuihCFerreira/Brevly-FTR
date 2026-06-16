import { env } from "@/env";
import fastify from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import { getShortenedUrlsRoute } from "./routes/get-shortened-urls";
import scalarUI from "@scalar/fastify-api-reference";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { getOriginalUrlByShortenedUrlRoute } from "./routes/get-original-url-by-shortened-url";
import { deleteShortenedUrlRoute } from "./routes/delete-shortened-url";
import { createShortenedUrlRoute } from "./routes/create-shortened-url";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Brev-ly",
      description: "API to shorten URLs",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(scalarUI, {
  routePrefix: "/docs",
  configuration: {
    layout: "modern",
  },
});

server.get("/openapi.json", () => server.swagger());

server.register(getShortenedUrlsRoute);
server.register(getOriginalUrlByShortenedUrlRoute);
server.register(deleteShortenedUrlRoute);
server.register(createShortenedUrlRoute);

server
  .listen({ port: env.PORT })
  .then(() => {
    console.log(`Server is running on port ${env.PORT}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
  });
