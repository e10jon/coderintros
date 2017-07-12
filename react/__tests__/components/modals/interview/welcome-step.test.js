// @flow

import {mount} from 'enzyme'
import React from 'react'

import WelcomeStep from '../../../../components/modals/interview/welcome-step'
import ModalStore from '../../../../stores/modal'

test('renders', () => {
  const store = new ModalStore()

  const component = mount(
    <WelcomeStep
      step={0}
      title='title'
    >
      <div>{'Content'}</div>
    </WelcomeStep>
    , {context: {store}})
  store.activeSlide = 0
  expect(component.html()).toBeTruthy()
})
