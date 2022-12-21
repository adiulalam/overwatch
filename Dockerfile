FROM node:16 AS base
WORKDIR /base
COPY package.json ./
RUN npm install
COPY . ./
RUN chmod +x ./entrypoint.sh
ENV NODE_ENV=production
RUN npx expo export:web

FROM joseluisq/static-web-server:2.14
COPY --from=base /base/web-build /public
COPY ./entrypoint.sh /
COPY ./static-web-server.toml /
# RUN ["chmod", "+x", "/entrypoint.sh"]
ENTRYPOINT ["/entrypoint.sh"]