import React from 'react'
import {mount} from 'enzyme'

import Interview from '../../pages/interview'

test('renders', () => {
  const component = mount(
    <Interview
      siteData={{images: {}}}
    />
  )
  expect(component.length).toBeTruthy()
})
