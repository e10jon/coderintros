// @flow

import React, {PureComponent} from 'react'

import createPage from '../helpers/create-page'

export class Error extends PureComponent {
  static defaultProps = {
    message: 'There was an error.'
  }

  static displayName = 'Error'

  props: {
    message?: string
  }

  render () {
    return (
      <div className='center'>
        <hr />
        <h1 className='my4'>{this.props.message}</h1>
        <hr />
      </div>
    )
  }
}

export default createPage(Error, {
  maxWidth: 3
})
