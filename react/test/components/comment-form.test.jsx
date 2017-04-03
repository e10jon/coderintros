import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { CommentForm, IN_PROGRESS } from 'components/comment-form'

test('CommentForm submits new comments', t => {
  const updateUI = sinon.spy()
  const preventDefault = sinon.spy()

  const wrapper = shallow(
    <CommentForm
      postId={1}
      updateUI={updateUI}
    />
  )

  wrapper.find('textarea[name="content"]').value = 'content'
  wrapper.find('input[name="name"]').value = 'name'
  wrapper.find('input[name="email"]').value = 'email@email.com'
  wrapper.find('form').simulate('submit', { preventDefault })

  t.pass(preventDefault.calledOnce)
  t.pass(updateUI.calledWith({commentSubmissionStatus: IN_PROGRESS}))

  // TODO: await the result of the form submission
})
