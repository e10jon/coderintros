import React from 'react'
import {mount} from 'enzyme'

import Header from '../../components/header'
import HeaderStore from '../../stores/header'
import ModalStore from '../../stores/modal'

test('renders', () => {
  const component = mount(<Header />, {
    context: {
      emailModalStore: new ModalStore(),
      headerStore: new HeaderStore(),
      likeModalStore: new ModalStore(),
      siteData: {images: {}, name: 'test'}
    }
  })
  expect(component).toBeTruthy()
})
