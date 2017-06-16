<div align="center">
  <a href="https://coderintros.com/">
    <img src="https://cf.coderintros.com/uploads/2017/06/logo.svg" alt="Coder Intros logo" title="Coder Intros" align="center" height="50" />
    </a>
</div>
<br />

## What is this?

It's the code that powers [coderintros.com](https://coderintros.com/). It's open-sourced because I love open-source code and want to give back to the open-source community, even though I never have (and probably never will) create an awesome OSS library or framework. Why is that? Well, I guess I've learned that my brain works in a way that thinks obsessively about what end users want, not what developers want. My hope is that you can read through this repo to get inspired to create something new, or maybe integrate a piece of my infrastructure/workflow into an existing project of yours.

## Look, I just want a profile on coderintros.com

No problem! Head on over to [https://coderintros.com/suggest/](https://coderintros.com/suggest/). No shame in suggesting yourself, I promise.

## How to run locally

Clone this repository, run  `./local.sh`, then visit [http://localhost/](http://localhost/). To log in to the Wordpress backend, go to [http://localhost/wp-admin](http://localhost/wp-admin) and use username: `admin` password: `password`.

## How to deploy

You'll need an [AWS account](https://aws.amazon.com/), and you'll also need more instructions than I feel like typing right now. But briefly, you'll need to do the following:

```
cd deploy

cp deploy.sample.sh deploy.sh
cp docker-compose.sample.yml docker-compose.yml

# open each file you cp'd and replace all the REPLACE_MEs
# with values that you'll have to create on your own

./deploy.sh
```

## In production

To let you know about some awesome businesses, and so that I don't forget about them, here are all the services that [coderintros.com](https://coderintros.com/) relies on:

- AWS
  - [Certificate Manager](https://us-west-2.console.aws.amazon.com/acm/home?region=us-west-2)
  - [CloudFront](https://console.aws.amazon.com/cloudfront/home?region=us-west-2)
  - [Container Service](https://us-west-2.console.aws.amazon.com/ecs/home?region=us-west-2)
  - [Route 53](https://console.aws.amazon.com/route53/home?region=us-west-2)
  - [S3](https://aws.amazon.com/s3/)
- Google
  - [Forms](https://forms.google.com/)
  - [Mail](https://mail.google.com/)
  - [Sheets](https://sheets.google.com/)
- [Mailchimp](https://mailchimp.com/)
- [Mailgun](https://www.mailgun.com/)
- [Namecheap](https://www.namecheap.com/)
- [Zapier](https://zapier.com/app/explore)
