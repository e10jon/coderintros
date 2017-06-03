#!/bin/bash

eval $(aws ecr get-login --profile wordact)

REACT_REPO_NAME=wordact-react
REPO_URI_BASE=892723720592.dkr.ecr.us-east-1.amazonaws.com
WORDPRESS_REPO_NAME=wordact-wordpress

docker build -t $WORDPRESS_REPO_NAME ./wordpress
docker tag $WORDPRESS_REPO_NAME:latest $REPO_URI_BASE/$WORDPRESS_REPO_NAME:latest
docker push $REPO_URI_BASE/$WORDPRESS_REPO_NAME:latest

docker build -t $REACT_REPO_NAME ./react
docker tag $REACT_REPO_NAME:latest $REPO_URI_BASE/$REACT_REPO_NAME:latest
docker push $REPO_URI_BASE/$REACT_REPO_NAME:latest

sed "s/<REPO_URI_BASE>/$REPO_URI_BASE/g;s/<REACT_REPO_NAME>/$REACT_REPO_NAME/;s/<WORDPRESS_REPO_NAME>/$WORDPRESS_REPO_NAME/" Dockerrun.aws.template.json > Dockerrun.aws.json

eb deploy
