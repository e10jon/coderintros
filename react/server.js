const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')

const app = next({dev: process.env.NODE_ENV !== 'production'})

module.exports = app.prepare().then(() => {
  return createServer((req, res) => {
    global.HOST = req.headers.host

    res.setHeader('Cache-Control', 'public')

    const parsedUrl = parse(req.url, true)
    const {pathname, query} = parsedUrl

    // this should match wordpress's permalink setting
    // e.g., /year/month/slug
    if (/\/\d{4}\/\d{2}\/.+/.test(pathname)) {
      app.render(req, res, '/post', query)
    } else {
      app.getRequestHandler()(req, res, parsedUrl)
    }
  })
})
