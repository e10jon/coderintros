import React from 'react'
import {mount} from 'enzyme'

import ThankYou from '../../../../components/modals/interview/thank-you'

test('renders', () => {
  const component = mount(<ThankYou />)
  expect(component.length).toBeTruthy()
})
