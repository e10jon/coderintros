// @flow

const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')

const app = next({dev: process.env.NODE_ENV !== 'production'})

module.exports = app.prepare().then(() => {
  return createServer((req, res) => {
    global.HOST = req.headers.host

    const parsedUrl: Object = parse(req.url, true)
    const {pathname, query} = parsedUrl

    if (/\/\d{4}\/\d{2}\/.+/.test(pathname)) {
      app.render(req, res, '/post', query)
    } else {
      app.getRequestHandler()(req, res, parsedUrl)
    }
  })
})
