import React, { Component, PropTypes } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateHeader } from 'store/ui'

class NotFound extends Component {
  static propTypes = {
    updateHeader: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.updateHeader({
      title: 'Oops.'
    })
  }

  renderRoute = ({staticContext}) => {
    if (staticContext) {
      staticContext.status = 404
    }

    return (
      <div className='flex-auto center p2'>
        <h2 className='mt0 mb2'>{"We couldn't find that page."}</h2>
      </div>
    )
  }

  render () {
    return <Route render={this.renderRoute} />
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ updateHeader }, dispatch)

export default connect(null, mapDispatchToProps)(NotFound)
