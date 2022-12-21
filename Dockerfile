FROM node:16 as web-build

WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
RUN npx expo export:web

FROM nginx:stable-alpine
COPY --from=web-build /app/web-build /usr/share/nginx/html
COPY --from=web-build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]