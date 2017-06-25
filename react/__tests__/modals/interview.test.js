import React from 'react'
import renderer from 'react-test-renderer'

import Interview from '../../components/modals/interview'

test('renders', () => {
  const component = renderer.create(<Interview />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
