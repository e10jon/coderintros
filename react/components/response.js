// @flow

import React, {Component} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'

@observer
class Response extends Component {
  static contextTypes = {
    postStore: MobxReactPropTypes.observableObject
  }

  props: {
    index: number,
    response: Object
  }

  handleAnswerUpdate = this.context.postStore.handleResponseUpdate.bind(this, {response: this.props.response, attr: 'answer'})
  handleQuestionUpdate = this.context.postStore.handleResponseUpdate.bind(this, {response: this.props.response, attr: 'question'})
  handleRemoveResponse = this.context.postStore.handleRemoveResponse.bind(this, this.props.index)

  render () {
    return (
      <div>
        <div>
          <select
            className='input'
            onChange={this.handleQuestionUpdate}
          >
            <option value=''>{'Select a question:'}</option>

            {this.context.postStore.questionsData.map(questionData => (
              <optgroup
                key={`OptGroup${questionData.section}`}
                label={questionData.section}
              >
                {questionData.questions.map(questionText => (
                  <option
                    key={`${questionData.section}${questionText}`}
                    value={questionText}
                  >
                    {questionText}
                  </option>
                ))}
              </optgroup>
            ))}

            <optgroup label='Custom'>
              <option value='[Edit your question here]'>{'[Ask yourself a question]'}</option>
            </optgroup>
          </select>
        </div>

        <div>
          <p>
            <strong
              className='block'
              contentEditable
              dangerouslySetInnerHTML={{__html: this.props.response.question}}
              onBlur={this.handleQuestionUpdate}
              placeholder='Question'
            />
          </p>
          <p
            className='block'
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.response.answer}}
            onBlur={this.handleAnswerUpdate}
            placeholder='Answer'
          />
        </div>

        <div>
          <a
            className='inline-block p1 border'
            href='javascript:void(0)'
            onClick={this.handleRemoveResponse}
          >
            {'Remove'}
          </a>
        </div>
      </div>
    )
  }
}

export default Response
