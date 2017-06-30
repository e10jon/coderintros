import React from 'react'
import {mount} from 'enzyme'

import Welcome from '../../../../components/modals/interview/welcome'

test('renders', () => {
  const component = mount(<Welcome />)
  expect(component.length).toBeTruthy()
})
