import React from 'react'
import {PropTypes as MobxReactPropTypes} from 'mobx-react'
import {mount} from 'enzyme'

import Welcome from '../../../../components/modals/interview/welcome'
import PostStore from '../../../../stores/post'

test('renders', () => {
  const postStore = new PostStore()
  const component = mount(<Welcome />, {
    childContextTypes: {postStore: MobxReactPropTypes.observableObject},
    context: {postStore}
  })
  expect(component.length).toBeTruthy()
})
