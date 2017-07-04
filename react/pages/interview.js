// @flow

import React, {Component} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'

import createPage from '../helpers/create-page'
import Post from '../components/post'
import ThankYouModal from '../components/modals/interview/thank-you'
import WelcomeModal from '../components/modals/interview/welcome'
import PostStore from '../stores/post'

@observer
export class Interview extends Component {
  static childContextTypes = {
    postStore: MobxReactPropTypes.observableObject
  }

  static displayName = 'Interview'

  getChildContext = () => ({
    postStore: this.postStore
  })

  componentWillMount () {
    this.postStore = new PostStore({questionsData: this.props.questionsData})
  }

  componentDidMount () {
    this.postStore.loadFromStore()
  }

  props: {
    questionsData: Object
  }
  postStore: Object
  thankYouModalStore: Object

  render = () => (
    <div>
      <Post />
      <WelcomeModal />
      {this.postStore.didSubmit && <ThankYouModal />}
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
