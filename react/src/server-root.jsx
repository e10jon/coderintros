import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

import App from 'app'

const ServerRoot = props => {
  const { store, routerContext, url, cookie } = props

  return (
    <Provider store={store}>
      <StaticRouter
        context={routerContext}
        location={url}
      >
        <App cookie={cookie} />
      </StaticRouter>
    </Provider>
  )
}

ServerRoot.propTypes = {
  cookie: PropTypes.string,
  routerContext: PropTypes.shape().isRequired,
  store: PropTypes.shape().isRequired,
  url: PropTypes.string.isRequired
}

ServerRoot.defaultProps = {
  cookie: ''
}

export default ServerRoot
