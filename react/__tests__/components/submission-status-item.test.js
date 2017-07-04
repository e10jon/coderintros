import React from 'react'
import {mount} from 'enzyme'

import SubmissionStatusItem from '../../components/submission-status-item'

test('renders', () => {
  const component = mount(<SubmissionStatusItem />)
  expect(component).toBeTruthy()
})
