import React from 'react'
import renderer from 'react-test-renderer'

import Ad from '../../components/ad'

test('renders', () => {
  const component = renderer.create(<Ad />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
