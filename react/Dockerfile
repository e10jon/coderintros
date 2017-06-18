FROM node:8.1-alpine

ARG SKIP_BUILD

WORKDIR /usr/src/app

COPY package.json .
RUN npm install
COPY . .

RUN if [ -z "$SKIP_BUILD" ]; then npm run build && npm prune --production; fi

EXPOSE 3000
CMD npm start
