<div align="center">
  <a href="https://coderintros.com/">
    <img src="https://coderintros.com/static/img/logo.svg" alt="Coder Intros logo" title="Coder Intros" align="center" height="50" />
    </a>
</div>
<br />

## How to use

Clone this repository, then run  `./local.sh`

## How to deploy

```
cp deploy.sample.sh deploy.sh  # open file, enter variables
cp Dockerrun.aws.sample.json Dockerrun.aws.json # open file, enter variables

eb init

./deploy.sh
```

## Production Accounts

- AWS
  - [Certificate Manager](https://us-west-2.console.aws.amazon.com/acm/home?region=us-west-2)
  - [CloudFront](https://console.aws.amazon.com/cloudfront/home?region=us-west-2)
  - [Elastic Beanstalk](https://us-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=us-west-2)
  - [Route 53](https://console.aws.amazon.com/route53/home?region=us-west-2)
- [Mailchimp](https://mailchimp.com/)
- [Mailgun](https://www.mailgun.com/)
- [Namecheap](https://www.namecheap.com/)
- [Zapier](https://zapier.com/app/explore)
