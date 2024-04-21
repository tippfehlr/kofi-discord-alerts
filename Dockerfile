FROM node:current-alpine
WORKDIR /app/
COPY . . 
RUN NODE_ENV=production npm ci

ENV NODE_ENV=production

ENV WEBHOOK_LINK=""
ENV PORT=4852

ENTRYPOINT ["node", "server.js"]
