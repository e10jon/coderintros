// @flow

import React, {Component} from 'react'
import {PropTypes as MobxReactPropTypes} from 'mobx-react'

import Store from '../stores/interview-question'

class InterviewQuestion extends Component {
  static contextTypes = {
    postStore: MobxReactPropTypes.observableObject
  }

  componentWillMount () {
    this.store = new Store()
  }

  props: {
    index: number,
    response: Object
  }
  store: Store

  handleAddResponse = this.context.postStore.handleAddResponse.bind(this, this.props.index)
  handleAnswerUpdate = this.context.postStore.handleResponseUpdate.bind(this, {response: this.props.response, attr: 'answer'})
  handleQuestionUpdate = this.context.postStore.handleResponseUpdate.bind(this, {response: this.props.response, attr: 'question'})
  handleRemoveResponse = this.context.postStore.handleRemoveResponse.bind(this, this.props.index)

  render () {
    return (
      <div>
        <a
          className='inline-block p1 border'
          href='javascript:void(0)'
          onClick={this.handleAddResponse}
        >
          {'Add'}
        </a>

        <a
          className='inline-block p1 border'
          href='javascript:void(0)'
          onClick={this.handleRemoveResponse}
        >
          {'Remove'}
        </a>

        <div>
          <select className='input'>
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
          </select>
        </div>

        <div>
          <p>
            <strong
              contentEditable
              dangerouslySetInnerHTML={{__html: this.props.response.question}}
              onBlur={this.handleQuestionUpdate}
            />
          </p>
          <p
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.response.answer}}
            onBlur={this.handleAnswerUpdate}
          />
        </div>
      </div>
    )
  }
}

export default InterviewQuestion
