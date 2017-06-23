<br />
<div align="center">
  <a href="https://coderintros.com/">
    <img src="https://cf.coderintros.com/uploads/2017/06/logo.svg" alt="Coder Intros logo" title="Coder Intros" align="center" height="40" />
    </a>
</div>
<br />
<br />
<hr />

## What is this?

It's the code that powers [coderintros.com](https://coderintros.com/). View it, fork it, learn from it, help make it better, or do none of those at all.

## Look, I just want a profile on coderintros.com

No problem! Head on over to [our suggestions page](https://coderintros.com/pages/suggest/). No shame in suggesting yourself, I promise.

## How to run locally

- Get the code: `git clone git@github.com:e10jc/coderintros.git`
- Start Docker: `./local`
- Route a local domain: Add `127.0.0.1 coderintros.dev` to `/etc/hosts`
- Visit the site @ [http://coderintros.dev/](http://coderintros.dev/)
- Visit the backend @ [http://coderintros.dev/wp-admin](http://coderintros.dev/wp-admin)
  - Login with `admin` `password`
- Also:
  - Download `gcloud-service-account.json` to the `wordpress` folder

## How to deploy

Sign up for an [AWS account](https://aws.amazon.com/), then do the following:

- Create an RDS instance.
- Create an Elastic Beanstalk application and environment, specifying all the environment variables from `docker-compose.yml`.
  - Use the AWS console, or `eb create prod --elb-type application --sample -i t2.micro -k coderintros --platform "multi-container-docker-1.12.6-(generic)" -pr --vpc.id REPLACE_ME --vpc.ec2subnets REPLACE_ME,REPLACE_ME --vpc.elbpublic --vpc.publicip --vpc.elbsubnets REPLACE_ME,REPLACE_ME`
- In ECS, create repositories named `react`, `wordpress`, and `varnish`.
- Create an Elastic IP and assign it to your Elastic Beanstalk instance.
- Create a Code Pipeline project, pulling from Github, running CodeBuild, deploying to Elastic Beanstalk.
  - Define `AWS_REGION`, `AWS_ACCOUNT_ID`, `BUILD_BUCKET`, and `PURGERS_ACL` environment variables in CodeBuild.
  - Upload `gcloud-service-account.json` to the `BUILD_BUCKET` S3 folder
  - Add the `AmazonEC2ContainerRegistryFullAccess` and `AmazonS3ReadOnlyAccess` policies to IAM role `code-build-coderintros-service-role`.
- Push to Github and watch the magic happen!

## In production

To let you know about some awesome businesses (and so that I don't forget about my accounts there) here are all the services that [coderintros.com](https://coderintros.com/) relies on:

- AWS
  - [Certificate Manager](https://us-west-2.console.aws.amazon.com/acm/home?region=us-west-2)
  - [CloudFront](https://console.aws.amazon.com/cloudfront/home?region=us-west-2)
  - [CodeBuild](https://us-west-2.console.aws.amazon.com/codebuild/home?region=us-west-2#/projects)
  - [CodePipeline](https://us-west-2.console.aws.amazon.com/codepipeline/home?region=us-west-2#/dashboard)
  - [EC2 Container Service](https://us-west-2.console.aws.amazon.com/ecs/home?region=us-west-2)
  - [Elastic Beanstalk](https://us-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=us-west-2#/applications)
  - [S3](https://aws.amazon.com/s3/)
- [Cloudflare](https://www.cloudflare.com/)
- Google
  - [Forms](https://forms.google.com/)
  - [Mail](https://mail.google.com/)
  - [Sheets](https://sheets.google.com/)
- [Mailchimp](https://mailchimp.com/)
- [Mailgun](https://www.mailgun.com/)
- [Namecheap](https://www.namecheap.com/)
- [Zapier](https://zapier.com/app/explore)
