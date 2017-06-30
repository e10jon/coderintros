import React from 'react'
import {mount} from 'enzyme'

import Suggest from '../../../components/in-content/suggest'

test('renders', () => {
  const component = mount(<Suggest />)
  expect(component.length).toBeTruthy()
})
