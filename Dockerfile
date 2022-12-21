FROM node:16 AS base
WORKDIR /base
COPY package.json ./
RUN npm install
COPY . ./
ENV NODE_ENV=production
RUN npx expo export:web

FROM joseluisq/static-web-server:2.14
COPY --from=base /base/web-build /public
RUN ["chmod", "+x", "entrypoint.sh"]
COPY ./entrypoint.sh /
RUN ["chmod", "+x", "/entrypoint.sh"]
COPY ./static-web-server.toml /
ENTRYPOINT ["/entrypoint.sh"]