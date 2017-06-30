import React from 'react'
import {mount} from 'enzyme'

import Post from '../../components/post'
import HeaderStore from '../../stores/header'

test('renders', () => {
  const component = mount(<Post />, {
    context: {
      headerStore: new HeaderStore()
    }
  })
  expect(component.length).toBeTruthy()
})
