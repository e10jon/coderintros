#!/bin/bash

# create service role (one time only):
# http://docs.aws.amazon.com/AmazonECS/latest/developerguide/check-service-role.html

# create public security group (one time only):
# aws ec2 create-security-group --description public --group-name public --vpc-id REPLACE_ME --profile REPLACE_ME
# aws ec2 authorize-security-group-ingress --group-id REPLACE_ME --protocol tcp --port 80 --cidr 0.0.0.0/0 --profile REPLACE_ME
# aws ec2 authorize-security-group-ingress --group-id REPLACE_ME --protocol tcp --port 443 --cidr 0.0.0.0/0 --profile REPLACE_ME
# aws ec2 authorize-security-group-egress --group-id REPLACE_ME --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 80, "ToPort": 80, "UserIdGroupPairs": [{"GroupId": "REPLACE_ME"}]}]' --profile REPLACE_ME
# aws ec2 revoke-security-group-egress --group-id REPLACE_ME --protocol all --port all --cidr 0.0.0.0/0 --profile REPLACE_ME

# create target group (one time only):
# aws elbv2 create-target-group --name REPLACE_ME --protocol HTTP --port 80 --vpc-id REPLACE_ME --health-check-path /health --profile REPLACE_ME

# create the cluster (one time only):
# ecs-cli up --keypair REPLACE_ME --capability-iam --vpc REPLACE_ME --subnets REPLACE_ME,REPLACE_ME --security-group REPLACE_ME

# set up your local env (one time only):
# install ecs-cli: sudo curl -o /usr/local/bin/ecs-cli https://s3.amazonaws.com/amazon-ecs-cli/ecs-cli-darwin-amd64-latest
# ecs-cli configure --cluster REPLACE_ME --region REPLACE_ME --profile REPLACE_ME

# create the load balancer and listeners (once for each new domain):
# aws elbv2 create-load-balancer --name REPLACE_ME --subnets REPLACE_ME REPLACE_ME --security-groups REPLACE_ME REPLACE_ME --profile REPLACE_ME
# aws elbv2 create-listener --load-balancer-arn REPLACE_ME --protocol HTTP --port 80 --default-actions Type=forward,TargetGroupArn=REPLACE_ME --profile REPLACE_ME
# aws elbv2 create-listener --load-balancer-arn REPLACE_ME --protocol HTTPS --port 443 --certificates CertificateArn=REPLACE_ME --ssl-policy ELBSecurityPolicy-2016-08 --default-actions Type=forward,TargetGroupArn=REPLACE_ME --profile REPLACE_ME

REPO_URI_BASE=REPLACE_ME

eval $(aws ecr get-login --profile REPLACE_ME)

docker build -t react ../react
docker tag react:latest $REPO_URI_BASE/react:latest
docker push $REPO_URI_BASE/react:latest

docker build -t wordpress ../wordpress
docker tag wordpress:latest $REPO_URI_BASE/wordpress:latest
docker push $REPO_URI_BASE/wordpress:latest

docker build -t varnish ../varnish
docker tag varnish:latest $REPO_URI_BASE/varnish:latest
docker push $REPO_URI_BASE/varnish:latest

ecs-cli compose service down
ecs-cli compose service up --target-group-arn REPLACE_ME --container-name varnish --container-port 80 --role ecsServiceRole
