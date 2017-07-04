import React from 'react'
import {mount} from 'enzyme'

import {Error} from '../../pages/_error'

test('renders', () => {
  const component = mount(<Error />)
  expect(component.length).toBeTruthy()
})
