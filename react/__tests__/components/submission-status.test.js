import React from 'react'
import {PropTypes as MobxReactPropTypes} from 'mobx-react'
import {mount} from 'enzyme'

import SubmissionStatus from '../../components/submission-status'
import PostStore from '../../stores/post'

test('renders', () => {
  const component = mount(
    <SubmissionStatus
      postData={{}}
    />, {
      childContextTypes: {postStore: MobxReactPropTypes.observableObject},
      context: {postStore: new PostStore()}
    })
  expect(component).toBeTruthy()
})
