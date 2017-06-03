const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')

const app = next({dev: process.env.NODE_ENV !== 'production'})

module.exports = app.prepare().then(() => {
  return createServer((req, res) => {
    global.HOST = req.headers.host

    const parsedUrl = parse(req.url, true)

    app.getRequestHandler()(req, res, parsedUrl)
  })
})
