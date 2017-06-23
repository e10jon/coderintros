FROM node:8.1-alpine

ARG SKIP_BUILD

WORKDIR /usr/src/app

RUN apk add --no-cache git bash

RUN npm i -g yarn
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
COPY . .

RUN if [ -z "$SKIP_BUILD" ]; then yarn run build && rm -rf node_modules && yarn install --production --pure-lockfile; fi

EXPOSE 3000

CMD yarn start
