import React from 'react'
import PropTypes from 'prop-types'

import Archive from 'containers/archive'
import SinglePost from 'containers/single-post'

const PageOrArchive = props => {
  if (/^\d{4}$/.test(props.match.params.slug)) {
    props.match.params.year = props.match.params.slug
    props.match.params.slug = undefined
    return <Archive {...props} />
  } else {
    return <SinglePost {...props} />
  }
}

PageOrArchive.propTypes = {
  match: PropTypes.shape().isRequired
}

export default PageOrArchive
