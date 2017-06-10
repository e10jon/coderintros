const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')

const app = next({dev: process.env.NODE_ENV !== 'production'})

module.exports = app.prepare().then(() => {
  return createServer((req, res) => {
    global.HOST = req.headers.host

    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
      res.statusCode = 301
      res.setHeader('Content-Type', 'text/plain')
      res.setHeader('Location', `https://${req.headers.host}${req.url}`)
      res.end()
      return
    }

    res.setHeader('Cache-Control', 'public')

    const parsedUrl = parse(req.url, true)
    const {pathname, query} = parsedUrl

    if (['/signup'].includes(pathname)) {
      // pass pages straight through to next.js
      app.getRequestHandler()(req, res, parsedUrl)
    } else if (/\/\d{4}\/\d{2}\/.+/.test(pathname)) {
      // regular post urls
      // this should match wordpress's permalink setting
      // e.g., /year/month/slug
      app.render(req, res, '/post', Object.assign({}, {
        type: 'posts',
        slug: pathname.match(/\/\d{4}\/\d{2}\/(.+?)(\/|$)/)[1]
      }, query))
    } else if (pathname === '/' && query.p) {
      // when previewing an unsaved draft post
      app.render(req, res, '/post', Object.assign({}, {type: 'posts'}, query))
    } else if (pathname && pathname !== '/') {
      // regular page urls
      app.render(req, res, '/post', Object.assign({}, {
        type: 'pages',
        slug: pathname.match(/\/(.+)/)[1]
      }, query))
    } else {
      app.getRequestHandler()(req, res, parsedUrl)
    }
  })
})
