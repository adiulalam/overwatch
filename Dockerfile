FROM node:16.18.0-buster-slim as web-build

WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
RUN npx expo export:web

FROM nginx:stable-alpine
COPY --from=web-build /app/web-build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]