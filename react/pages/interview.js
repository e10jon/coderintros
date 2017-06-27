// @flow

import React, {Component} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'

import createPage from '../helpers/create-page'
import Post from '../components/post'
import InterviewModal from '../components/modals/interview'
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
    this.postStore = new PostStore({
      questionsData: this.props.questionsData
    })
  }

  componentDidMount () {
    this.postStore.loadFromStore()
  }

  props: {
    questionsData: Object
  }
  postStore: Object

  render = () => (
    <div>
      <Post />
      <InterviewModal />
    </div>
  )
}

export default createPage(Interview, {
  fullWidth: true,
  maxWidth: 3,
  propPaths: () => ({
    questionsData: '/ci/questions'
  })
})
