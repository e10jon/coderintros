FROM alpine:latest

RUN apk update && \
  apk upgrade && \
  apk add --no-cache varnish bash

COPY default.vcl /etc/varnish/default.vcl

CMD varnishd -F -f /etc/varnish/default.vcl

EXPOSE 80
