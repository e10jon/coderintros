import React from 'react'
import {mount} from 'enzyme'

import Singular from '../../pages/singular'

test('renders', () => {
  const component = mount(
    <Singular
      siteData={{images: {}}}
      url={{query: {type: 'post'}}}
    />
  )
  expect(component.length).toBeTruthy()
})
