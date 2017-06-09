#!/bin/bash

REPO_URI_BASE=

eval $(aws ecr get-login --profile REPLACE_ME)

docker build -t wordpress ./wordpress
docker tag wordpress:latest $REPO_URI_BASE/wordpress:latest
docker push $REPO_URI_BASE/wordpress:latest

docker build -t react ./react
docker tag react:latest $REPO_URI_BASE/react:latest
docker push $REPO_URI_BASE/react:latest

docker build -t varnish ./varnish
docker tag varnish:latest $REPO_URI_BASE/varnish:latest
docker push $REPO_URI_BASE/varnish:latest

eb deploy
