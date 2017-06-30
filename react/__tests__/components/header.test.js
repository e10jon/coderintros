import React from 'react'
import {mount} from 'enzyme'

import Header from '../../components/header'
import HeaderStore from '../../stores/header'

test('renders', () => {
  const component = mount(<Header />, {
    context: {
      headerStore: new HeaderStore(),
      siteData: {images: {}, name: 'test'}
    }
  })
  expect(component).toBeTruthy()
})
