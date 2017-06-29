// @flow

import React, {PureComponent} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'
import {
  IoPlus as AddIcon,
  IoShuffle as RandomQuestionIcon,
  IoTrashA as RemoveIcon
} from 'react-icons/lib/io'

import ContentEditable from './content-editable'

@observer
class Response extends PureComponent {
  static contextTypes = {
    postStore: MobxReactPropTypes.observableObject
  }

  props: {
    response: Object
  }

  handleAddResponse = this.context.postStore.handleAddResponse.bind(null, this.props.response)
  handleAnswerUpdate = this.context.postStore.handleResponseUpdate.bind(null, {response: this.props.response, attr: 'answer'})
  handleGenerateRandomQuestion = this.context.postStore.generateRandomQuestion.bind(null, this.props.response)
  handleQuestionUpdate = this.context.postStore.handleResponseUpdate.bind(null, {response: this.props.response, attr: 'question'})
  handleRemoveResponse = this.context.postStore.handleRemoveResponse.bind(null, this.props.response)

  render () {
    return (
      <div className='my2 relative response'>
        <p>
          <ContentEditable
            NodeName='strong'
            dangerouslySetInnerHTML={{__html: this.props.response.question}}
            onBlur={this.handleQuestionUpdate}
            placeholder='The question'
          />
        </p>

        <p>
          <ContentEditable
            allowReturnKeyPress
            dangerouslySetInnerHTML={{__html: this.props.response.answer}}
            onBlur={this.handleAnswerUpdate}
            placeholder='...'
          />
        </p>

        <div className='response-row-icons'>
          <a
            className='inline-block h5 px1 sans-serif mx1'
            href='javascript:void(0)'
            onClick={this.handleGenerateRandomQuestion}
          >
            <RandomQuestionIcon />
          </a>

          <a
            className='inline-block h5 px1 sans-serif mx1'
            href='javascript:void(0)'
            onClick={this.handleAddResponse}
          >
            <AddIcon />
          </a>

          <a
            className='inline-block h5 px1 sans-serif mx1'
            href='javascript:void(0)'
            onClick={this.handleRemoveResponse}
          >
            <RemoveIcon />
          </a>
        </div>
      </div>
    )
  }
}

export default Response
