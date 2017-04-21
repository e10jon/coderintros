import createBrowserHistory from 'history/createBrowserHistory'
import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from 'app'

const history = createBrowserHistory()

history.listen(location => {
  const { ga } = window

  if (ga) {
    ga('set', 'page', location.pathname)
    ga('send', 'pageview')
  }
})

const Root = props => {
  return (
    <Provider store={props.store}>
      <Router history={history}>
        <App cookie={window.document.cookie} />
      </Router>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.shape().isRequired
}

export default Root
