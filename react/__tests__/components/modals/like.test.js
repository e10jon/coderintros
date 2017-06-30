import React from 'react'
import {mount} from 'enzyme'

import Like from '../../../components/modals/like'

test('renders', () => {
  const component = mount(<Like />)
  expect(component.length).toBeTruthy()
})
