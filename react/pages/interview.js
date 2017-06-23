// @flow

import React, {Component} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'

import createPage from '../helpers/create-page'
import Post from '../components/post'
import PostStore from '../stores/post'

@observer
class Interview extends Component {
  static childContextTypes = {
    postStore: MobxReactPropTypes.observableObject
  }

  static displayName = 'Interview'

  getChildContext = () => ({
    postStore: this.postStore
  })

  componentWillMount () {
    this.postStore = new PostStore()
  }

  postStore: Object

  render () {
    return (
      <Post />
    )
  }
}

export default createPage(Interview, {
  hrTop: false
})
