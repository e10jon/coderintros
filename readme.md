<div align="center">
  <a href="https://coderintros.com/">
    <img src="https://cf.coderintros.com/uploads/2017/06/logo.svg" alt="Coder Intros logo" title="Coder Intros" align="center" height="50" />
    </a>
</div>
<br />

## What is this?

It's the code that powers [coderintros.com](https://coderintros.com/). It's open-sourced because I love open-source code and want to give back to the open-source community, even though I never have (and probably never will) create an awesome OSS library or framework. My hope is that you can read through this repo to get inspired to create something new, or maybe integrate a piece of my infrastructure/workflow into an existing project of yours.

## Look, I just want a profile on coderintros.com

No problem! Head on over to [https://coderintros.com/suggest/](https://coderintros.com/suggest/). No shame in suggesting yourself, I promise.

## How to run locally

- Get the code: `git clone git@github.com:e10jc/coderintros.git`
- Start Docker: `./local`
- Route a local domain: Add `127.0.0.1 coderintros.dev` to `/etc/hosts`
- Visit the site @ [http://coderintros.dev/](http://coderintros.dev/)
- Visit the backend @ [http://coderintros.dev/wp-admin](http://coderintros.dev/wp-admin)
  - Login with `admin` `password`

## How to deploy

You'll need an [AWS account](https://aws.amazon.com/), and you'll also need more instructions than I feel like typing right now. But briefly, do the following:

- Create an RDS instance.
- Create an Elastic Beanstalk application and environment, specifying all the environment variables from `docker-compose.yml`.
  - Use the AWS console, or `eb create prod --elb-type application --sample -i t2.micro -k coderintros --platform "multi-container-docker-1.12.6-(generic)" -pr --vpc.id REPLACE_ME --vpc.ec2subnets REPLACE_ME,REPLACE_ME --vpc.elbpublic --vpc.publicip --vpc.elbsubnets REPLACE_ME,REPLACE_ME`
- Create a Code Pipeline project, pulling from Github, running CodeBuild, deploying to Elastic Beanstalk.
  - Define `AWS_REGION` and `AWS_ACCOUNT_ID` environment variables in CodeBuild.
  - Add the `AmazonEC2ContainerRegistryFullAccess` policy to IAM role `code-build-coderintros-service-role`.
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
