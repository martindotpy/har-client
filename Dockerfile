FROM oven/bun:1.2.14@sha256:5a4b539bfd3d93bb61e7c18321e0d8726eee930ef8076ffd06930ac7baa24c15 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun astro telemetry disable
RUN bun run build


FROM nginx:alpine3.21-slim@sha256:b947b2630c97622793113555e13332eec85bdc7a0ac6ab697159af78942bb856 AS runtime

RUN apk add --no-cache curl

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]