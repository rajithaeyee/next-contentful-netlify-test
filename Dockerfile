FROM node:18 as builder

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install

COPY . .

ARG CONTENTFUL_SPACE_ID
ENV CONTENTFUL_SPACE_ID=${CONTENTFUL_SPACE_ID}

ARG CONTENTFUL_ACCESS_TOKEN
ENV CONTENTFUL_ACCESS_TOKEN=${CONTENTFUL_ACCESS_TOKEN}

RUN npm run build


FROM nginx:stable-alpine as runner

WORKDIR /app

ENV NODE_ENV=production
ENV CONTENTFUL_SPACE_ID=${CONTENTFUL_SPACE_ID}
ENV CONTENTFUL_ACCESS_TOKEN=${CONTENTFUL_ACCESS_TOKEN}

# COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/public ./public

EXPOSE 80

CMD ["sh", "-c", "nginx && node server.js"]
