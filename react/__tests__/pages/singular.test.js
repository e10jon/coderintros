import React from 'react'
import {mount} from 'enzyme'

import Singular from '../../pages/singular'

test('renders', () => {
  const component = mount(<Singular siteData={{images: {}}} />)
  expect(component.length).toBeTruthy()
})
