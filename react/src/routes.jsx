import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Archive from 'containers/archive'
import HomeOrArchive from 'helpers/routes/home-or-archive'
import PageOrArchive from 'helpers/routes/page-or-archive'
import NotFound from 'containers/not-found'
import SinglePost from 'containers/single-post'

export const routesProps = [{
  component: Archive,
  exact: true,
  path: '/(category|tag|author)/:slug'
}, {
  component: SinglePost,
  exact: true,
  path: '/:year/:month/:slug'
}, {
  component: Archive,
  exact: true,
  path: '/:year/:month'
}, {
  component: PageOrArchive,
  exact: true,
  path: '/:slug'
}, {
  component: HomeOrArchive,
  exact: true,
  path: '/'
}, {
  component: NotFound
}]

export const SwitchComponent = (
  <Switch>
    {routesProps.map(route => (
      <Route
        key={route.path || ''}
        {...route}
      />
    ))}
  </Switch>
)
