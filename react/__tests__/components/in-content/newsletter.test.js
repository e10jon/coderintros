import React from 'react'
import {mount} from 'enzyme'

import Newsletter from '../../../components/in-content/newsletter'

test('renders', () => {
  const component = mount(<Newsletter />)
  expect(component.length).toBeTruthy()
})
