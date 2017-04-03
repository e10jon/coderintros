import React from 'react'
import { Resolver } from 'react-resolver'

import Root from 'client-root'
import createStore from 'store/create-store'

const state = window.__state
delete window.__state

const store = createStore({state})

const renderRoot = () => (
  Resolver.render(() => <Root store={store} />, document.getElementById('root'))
)

if (module.hot) {
  module.hot.accept('client-root', () => renderRoot())
}

renderRoot()
