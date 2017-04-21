import React from 'react'
import PropTypes from 'prop-types'

import Archive from 'containers/archive'
import Home from 'containers/home'

const HomeOrArchive = props => {
  if (/\?s=/.test(props.location.search)) {
    return <Archive {...props} />
  } else {
    return <Home {...props} />
  }
}

HomeOrArchive.propTypes = {
  location: PropTypes.shape().isRequired
}

export default HomeOrArchive
