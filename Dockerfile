FROM node:16.18.0-buster-slim

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest

RUN mkdir /overwatch
WORKDIR /overwatch
ENV PATH /overwatch/.bin:$PATH
COPY ./package.json ./
RUN npm install

ENTRYPOINT ["npm", "run"]
CMD ["web"]