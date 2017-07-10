const Koa = require('koa')
const {join} = require('path')
const mobxReact = require('mobx-react')
const Router = require('koa-router')
const next = require('next')
const Raven = require('raven')

mobxReact.useStaticRendering(true)

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handle = app.getRequestHandler()

// make sure this matches wordpress's permalink setting
const postPath = '/interviews'

if (process.env.SENTRY_DSN_NODE) {
  Raven.config(process.env.SENTRY_DSN_NODE).install()
}

module.exports = app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  if (process.env.SENTRY_DSN_NODE) {
    server.on('error', err => Raven.captureException(err))
  }

  router.get('/robots.txt', async ctx => {
    await app.serveStatic(ctx.req, ctx.res, join(__dirname, 'static/robots.txt'))
    ctx.respond = false
  })

  router.get('/favicon.ico', async ctx => {
    await app.serveStatic(ctx.req, ctx.res, join(__dirname, 'static/img/favicon.ico'))
    ctx.respond = false
  })

  router.get(postPath, async ctx => {
    await app.render(ctx.req, ctx.res, '/archive', ctx.query)
    ctx.respond = false
  })

  router.get('/interview', async ctx => {
    ctx.set('Cache-Control', 'public, max-age=5, s-maxage=30')
    await app.render(ctx.req, ctx.res, '/interview', ctx.query)
    ctx.respond = false
  })

  // regular post urls
  router.get(`${postPath}/:slug`, async ctx => {
    ctx.query.type = 'post'
    ctx.query.slug = ctx.params.slug
    await app.render(ctx.req, ctx.res, '/singular', ctx.query)
    ctx.respond = false
  })

  // post or page preview (without saving first)
  router.get('/', async (ctx, next) => {
    if (ctx.query.p || ctx.query.page_id) {
      ctx.query.type = ctx.query.page_id ? 'page' : 'post'
      await app.render(ctx.req, ctx.res, '/singular', ctx.query)
      ctx.respond = false
    } else {
      await next()
    }
  })

  // pages
  router.get('/:slug', async ctx => {
    ctx.query.type = 'page'
    ctx.query.slug = ctx.params.slug
    await app.render(ctx.req, ctx.res, '/singular', ctx.query)
    ctx.respond = false
  })

  // everything else
  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  // if x-forwarded-proto is set, redirect unless request is https
  server.use(async (ctx, next) => {
    if (ctx.get('x-forwarded-proto') && ctx.get('x-forwarded-proto') !== 'https') {
      ctx.status = 301
      ctx.redirect(`https://${ctx.get('host')}${ctx.url}`)
    } else {
      await next()
    }
  })

  // next.js needs a status from koa
  server.use(async (ctx, next) => {
    ctx.status = 200
    await next()
  })

  // set default cache-control for most paths
  server.use(async (ctx, next) => {
    if (/\/static\//.test(ctx.path)) {
      ctx.set('Cache-Control', 'public, max-age=31536000')
    } else if (!/\/_next\//.test(ctx.path)) {
      ctx.set('Cache-Control', 'public, max-age=5, s-maxage=31536000')
    }
    await next()
  })

  // set global.HOST so our fetch can use it
  server.use(async (ctx, next) => {
    global.HOST = ctx.req.headers.host
    await next()
  })

  server.use(router.routes())

  return server
})
