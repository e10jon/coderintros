import React from 'react'
import {mount} from 'enzyme'

import ContentEditable from '../../components/content-editable'

test('renders', () => {
  const component = mount(<ContentEditable />)
  expect(component.length).toBeTruthy()
})
