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
    index: number
  }
  store: Store

  handleAddQuestion = () => this.context.postStore.handleAddQuestion.bind(this, this.props.index)
  handleRemoveQuestion = () => this.context.postStore.handleRemoveQuestion.bind(this, this.props.index)

  render () {
    const {handleAddQuestion, handleRemoveQuestion} = this
    const {postStore} = this.context

    return (
      <div>
        <a
          className='inline-block p1 border'
          href='javascript:void(0)'
          onClick={handleAddQuestion}
        >
          {'Add'}
        </a>

        <a
          className='inline-block p1 border'
          href='javascript:void(0)'
          onClick={handleRemoveQuestion}
        >
          {'Remove'}
        </a>

        <div>
          <select className='input'>
            {postStore.questionsData.map(questionData => (
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
      </div>
    )
  }
}

export default InterviewQuestion
