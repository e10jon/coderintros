const {createServer} = require('http')
const {join} = require('path')
const mobxReact = require('mobx-react')
const {parse} = require('url')
const next = require('next')

mobxReact.useStaticRendering(true)

const app = next({dev: process.env.NODE_ENV !== 'production'})

// make sure this matches wordpress's permalink setting,
// and set a capture group for the post slug
const postPathPrefix = '/profiles'
const postRegex = new RegExp(`${postPathPrefix}/(.+?)(/|$)`)

module.exports = app.prepare().then(() => {
  return createServer((req, res) => {
    global.HOST = req.headers.host

    // if x-forwarded-proto is set, make sure the request is https
    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
      res.statusCode = 301
      res.setHeader('Content-Type', 'text/plain')
      res.setHeader('Location', `https://${req.headers.host}${req.url}`)
      res.end()
      return
    }

    // cache everything. this will be overrided in development by next.js
    res.setHeader('Cache-Control', 'public, smax-age=31536000')

    const parsedUrl = parse(req.url, true)
    const {pathname, query} = parsedUrl

    if (parsedUrl.pathname === '/robots.txt') {
      app.serveStatic(req, res, join(__dirname, 'static/robots.txt'))
    } else if (parsedUrl.pathname === '/favicon.ico') {
      app.serveStatic(req, res, join(__dirname, 'static/img/favicon.ico'))
    } else if (pathname === '/interview') {
      app.getRequestHandler()(req, res, parsedUrl)
    } else if (postRegex.test(pathname)) {
      // regular post urls
      app.render(req, res, '/post', Object.assign({}, {
        type: 'posts',
        slug: pathname.match(postRegex)[1]
      }, query))
    } else if (pathname === '/' && query.p) {
      // when previewing an unsaved draft post
      app.render(req, res, '/post', Object.assign({}, {type: 'posts'}, query))
    } else if (pathname === postPathPrefix) {
      app.render(req, res, '/archive', query)
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
