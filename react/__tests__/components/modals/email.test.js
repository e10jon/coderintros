import React from 'react'
import {mount} from 'enzyme'

import Email from '../../../components/modals/email'

test('renders', () => {
  const component = mount(<Email />)
  expect(component.length).toBeTruthy()
})
