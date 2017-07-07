import React from 'react'
import {mount} from 'enzyme'

import Tagline from '../../components/tagline'

test('renders', () => {
  const component = mount(<Tagline postData={{}} />)
  expect(component).toBeTruthy()
})
