FROM node:16 AS web-build

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci
COPY ./ /app/
ARG REACT_APP_AUTH0_DOMAIN_NAME
ARG REACT_APP_AUTH0_CLIENT_ID
RUN printf 'REACT_APP_AUTH0_DOMAIN_NAME=%s\nREACT_APP_AUTH0_CLIENT_ID=%s\n' "$REACT_APP_AUTH0_DOMAIN_NAME" "$REACT_APP_AUTH0_CLIENT_ID" > .env \
    && npx expo export:web

FROM node:24-alpine AS server-deps
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=server-deps /app/server/node_modules ./server/node_modules
COPY server/package.json server/index.js ./server/
COPY db ./db
COPY --from=web-build /app/web-build ./web-build
USER node
EXPOSE 3000
CMD ["node", "server/index.js"]
