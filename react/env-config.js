// make sure these are defined at build-time when deploying.
// that means adding them to the Dockerfile, defining them in CodeBuild,
// and making sure they are passed through as build-args in buildspec.yml
module.exports = {
  'AUTOMATED_JWT_TOKEN': process.env.AUTOMATED_JWT_TOKEN,
  'G_RECAPTCHA_ENABLED': process.env.G_RECAPTCHA_ENABLED,
  'G_RECAPTCHA_SITEKEY': process.env.G_RECAPTCHA_SITEKEY,
  'SENTRY_DSN_REACT': process.env.SENTRY_DSN_REACT
}
