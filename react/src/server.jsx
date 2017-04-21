import Koa from 'koa'
import logger from 'koa-logger'
import Router from 'koa-router'
import serveStatic from 'koa-static-server'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Resolver } from 'react-resolver'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

import Html from 'html'
import Root from 'server-root'
import { routesProps } from 'routes'
import createStore from 'store/create-store'
import { extractCssAndJsFromManifest, convertCssUrlsToInlineStyles } from 'helpers/server-assets'

const koa = new Koa()
const router = new Router()

koa.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.stack
    ctx.app.emit('error', err, ctx)
  }
})

if (['development', 'production'].includes(process.env.NODE_ENV)) {
  koa.use(logger())
}

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackConfig = require('../webpack/browser.config')
  const webpackMiddleware = require('koa-webpack-dev-middleware')
  const webpackHotMiddleware = require('koa-webpack-hot-middleware')
  const compiledConfig = webpack(webpackConfig)
  koa.use(webpackMiddleware(compiledConfig, {publicPath: compiledConfig.options.output.publicPath}))
  koa.use(webpackHotMiddleware(compiledConfig))
} else {
  koa.use(serveStatic({
    log: false,
    rootDir: './dist/browser',
    rootPath: '/dist/browser/'
  }))
}

koa.use(async (ctx, next) => {
  if (process.env.ENFORCE_HOST && process.env.ENFORCE_HOST !== ctx.host) {
    ctx.redirect(ctx.href.replace(ctx.host, process.env.ENFORCE_HOST))
  } else {
    await next()
  }
})

const handleRoute = async ctx => {
  const { header, req } = ctx

  const store = createStore()
  const routerContext = {}

  const {
    Resolved: ResolvedRootComponent,
    data: resolvedData
  } = await Resolver.resolve(() =>
    <Root
      cookie={header.cookie}
      routerContext={routerContext}
      store={store}
      url={req.url}
    />
  )

  const [cssUrls, jsUrls] = extractCssAndJsFromManifest()
  const inlineCss = convertCssUrlsToInlineStyles(cssUrls)
  const rootString = renderToString(<ResolvedRootComponent />)

  const htmlString = renderToStaticMarkup(
    <Html
      cssUrls={cssUrls}
      finalState={store.getState()}
      helmet={Helmet.renderStatic()}
      inlineCss={inlineCss}
      jsUrls={jsUrls}
      resolvedData={resolvedData}
      rootString={rootString}
    />
  )

  ctx.status = routerContext.status || 200
  ctx.body = `<!doctype html>${htmlString}`
}

routesProps.forEach(routeProps => {
  router.get(routeProps.path || '*', handleRoute)
})

koa.use(router.routes()).use(router.allowedMethods())

export default koa
