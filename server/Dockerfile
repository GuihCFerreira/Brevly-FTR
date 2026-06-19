FROM node:22.22.1-alpine AS base

RUN npm install -g pnpm@11

WORKDIR /usr/src/app

FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

FROM base AS build

COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN pnpm run build

RUN pnpm prune --prod

FROM node:22.22.1-alpine AS deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

USER node

EXPOSE 3333

CMD ["node", "dist/infra/http/server.mjs"]