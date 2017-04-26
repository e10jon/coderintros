import test from 'ava'
import { matchPath } from 'react-router-dom'

import { SwitchComponent, routesProps } from 'routes'

const findRoute = url => routesProps.find(routeProps => matchPath(url, routeProps))

test('all routes match properly', t => {
  t.is(findRoute('/category/x').path, '/(category|tag|author)/:slug')
  t.is(findRoute('/tag/x').path, '/(category|tag|author)/:slug')
  t.is(findRoute('/author/x').path, '/(category|tag|author)/:slug')

  t.is(findRoute('/2017/1/a-slug').path, '/:year/:month/:slug')

  t.is(findRoute('/2017/1').path, '/:year/:month')

  t.is(findRoute('/slug').path, '/:slug')
  t.is(findRoute('/2017').path, '/:slug')

  t.is(findRoute('/').path, '/')

  t.is(findRoute('/this/is/not/found').path, undefined)
})

test('SwitchComponent contains routesProps', t => {
  t.is(SwitchComponent.props.children.length, routesProps.length)
})
