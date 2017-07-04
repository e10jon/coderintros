import React from 'react'
import {mount} from 'enzyme'

import {Home} from '../../pages/index'

test('renders', () => {
  const component = mount(<Home postsData={[]} />, {context: {siteData: {images: {}}}})
  expect(component.length).toBeTruthy()
})
