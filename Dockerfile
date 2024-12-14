FROM node:18-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ARG CONTENTFUL_SPACE_ID
ENV CONTENTFUL_SPACE_ID=${CONTENTFUL_SPACE_ID}
ARG CONTENTFUL_ACCESS_TOKEN
ENV CONTENTFUL_ACCESS_TOKEN=${CONTENTFUL_ACCESS_TOKEN}

RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV CONTENTFUL_SPACE_ID=${CONTENTFUL_SPACE_ID}
ENV CONTENTFUL_ACCESS_TOKEN=${CONTENTFUL_ACCESS_TOKEN}

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]