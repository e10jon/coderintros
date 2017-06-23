// @flow

import React from 'react'
import {PropTypes as MobxReactPropTypes} from 'mobx-react'

const InterviewQuestion = ({question, index}: {question: Object, index: number} = {}, {postStore}: {postStore: Object}) => {
  const handleAddQuestion = postStore.handleAddQuestion.bind(this, index)
  const handleRemoveQuestion = postStore.handleRemoveQuestion.bind(this, index)

  return (
    <div>
      {!question ? 'welcome' : 'question'} {question.id}
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
    </div>
  )
}

InterviewQuestion.contextTypes = {
  postStore: MobxReactPropTypes.observableObject
}

export default InterviewQuestion
