FROM debian:jessie

ENV NVM_DIR /home/nodejs/.nvm
ENV NODE_VERSION 7.8.0

RUN apt-get update \
  && apt-get install -y curl python git

RUN groupadd -r nodejs \
  && useradd -r -m -g nodejs nodejs

RUN mkdir -p /usr/src/app && \
  chown -R nodejs:nodejs /usr/src/app

USER nodejs
WORKDIR /usr/src/app

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash \
  && . "${NVM_DIR}/nvm.sh" \
  && nvm install $NODE_VERSION

ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

COPY . .

RUN npm install --only=production \
  && npm install --only=development \
  && npm run build \
  && npm prune --production

EXPOSE 3000

CMD ["node", "dist/server/server.js"]
