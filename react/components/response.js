// @flow

import React, {Component} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'
import {IoTrashA as RemoveIcon} from 'react-icons/lib/io'

import ResponseStore from '../stores/response'

@observer
class Response extends Component {
  static contextTypes = {
    postStore: MobxReactPropTypes.observableObject
  }

  componentWillMount () {
    this.store = new ResponseStore(this.props.response)
  }

  props: {
    index: number,
    response: Object
  }
  store: Object

  handleAddResponse = this.context.postStore.handleAddResponse.bind(null, this.props.index)
  handleAnswerUpdate = this.context.postStore.handleResponseUpdate.bind(null, {response: this.props.response, attr: 'answer'})
  handleQuestionUpdate = this.context.postStore.handleResponseUpdate.bind(null, {response: this.props.response, attr: 'question'})
  handleRemoveResponse = this.context.postStore.handleRemoveResponse.bind(null, this.props.index)

  handleSelectQuestion = (e: Object) => {
    this.store.didSelectQuestion = true
    this.context.postStore.handleResponseUpdate({response: this.props.response, attr: 'question'}, e)
  }

  render () {
    return (
      <div className='my2'>
        {!this.store.didSelectQuestion ? (
          <div>
            <select
              className='input'
              onChange={this.handleSelectQuestion}
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
        ) : (
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

            <div>
              <a
                className='inline-block h5 px1 border sans-serif'
                href='javascript:void(0)'
                onClick={this.handleAddResponse}
              >
                <RemoveIcon />
                <span className='align-middle pl1'>{'Add another question'}</span>
              </a>

              <a
                className='inline-block h5 px1 border sans-serif'
                href='javascript:void(0)'
                onClick={this.handleRemoveResponse}
              >
                <RemoveIcon />
                <span className='align-middle pl1'>{'Delete'}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Response
