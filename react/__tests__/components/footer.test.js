import React from 'react'
import {mount} from 'enzyme'

import Footer from '../../components/footer'

test('renders', () => {
  const component = mount(<Footer />, {
    context: {
      siteData: {name: 'test'}
    }
  })
  expect(component).toBeTruthy()
})
