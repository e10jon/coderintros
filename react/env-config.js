// make sure these are defined at build-time in production
module.exports = {
  'AUTOMATED_JWT_TOKEN': process.env.AUTOMATED_JWT_TOKEN,
  'G_RECAPTCHA_SITEKEY': process.env.G_RECAPTCHA_SITEKEY
}
