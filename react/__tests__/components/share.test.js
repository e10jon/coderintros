import React from 'react'
import {mount} from 'enzyme'

import Share from '../../components/share'

test('renders', () => {
  const component = mount(<Share />)
  expect(component).toBeTruthy()
})
