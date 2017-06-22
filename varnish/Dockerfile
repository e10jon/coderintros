FROM alpine:latest

RUN apk update && \
  apk upgrade && \
  apk add --no-cache varnish bash

COPY default.vcl /etc/varnish/default.vcl

CMD varnishd -f /etc/varnish/default.vcl && \
  sleep 5 && \
  varnishncsa

EXPOSE 80
