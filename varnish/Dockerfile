FROM alpine:latest

ARG PURGERS_ACL

RUN apk update && \
  apk upgrade && \
  apk add --no-cache varnish bash

WORKDIR /etc/varnish

COPY default.template.vcl ./

RUN sed "s/PURGERS_ACL/$PURGERS_ACL/g;" default.template.vcl > default.vcl

CMD varnishd -f /etc/varnish/default.vcl && \
  sleep 5 && \
  varnishncsa

EXPOSE 80
