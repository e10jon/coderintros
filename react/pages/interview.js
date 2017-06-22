// @flow

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'

import createPage from '../helpers/create-page'
import Post from '../components/post'
import EditableInterviewStore from '../stores/editable-interview'

class Interview extends Component {
  static childContextTypes = {
    editableInterviewStore: PropTypes.object
  }

  getChildContext = () => ({
    editableInterviewStore: this.editableInterviewStore
  })

  componentWillMount () {
    this.editableInterviewStore = new EditableInterviewStore()
  }

  editableInterviewStore: Object

  render () {
    return (
      <Post editable />
    )
  }
}

export default createPage(observer(Interview), {
  hrTop: false
})
