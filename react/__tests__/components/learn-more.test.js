import React from 'react'
import {mount} from 'enzyme'

import LearnMore from '../../components/learn-more'

test('renders', () => {
  const component = mount(<LearnMore postData={{}} />)
  expect(component).toBeTruthy()
})
