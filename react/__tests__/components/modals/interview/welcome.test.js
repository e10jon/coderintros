// @flow

import {mount, ReactWrapper} from 'enzyme'
import {PropTypes as MobxReactPropTypes} from 'mobx-react'
import React from 'react'
import ReactModal from 'react-modal'
import sinon from 'sinon'

import Welcome from '../../../../components/modals/interview/welcome'
import PostStore from '../../../../stores/post'

test('renders, gets input, closes', () => {
  const postStore = new PostStore()
  const generateInitialResponses = sinon.spy(postStore, 'generateInitialResponses')

  const component = mount(<Welcome />, {
    childContextTypes: {postStore: MobxReactPropTypes.observableObject},
    context: {postStore}
  })
  const portal = new ReactWrapper(component.find(ReactModal).node.portal, true)

  expect(portal.props().isOpen).toBeTruthy()
  portal.find('#welcome-next-button').simulate('click')
  portal.find('#welcome-name-input').simulate('change', {target: {value: 'name'}})
  portal.find('#welcome-next-button').simulate('click')
  portal.find('#welcome-email-input').simulate('change', {target: {value: 'name@domain.com'}})
  portal.find('#welcome-next-button').simulate('click')
  portal.find('#welcome-current-location-input').simulate('change', {target: {value: 'somewhere, usa'}})
  portal.find('#welcome-next-button').simulate('click')
  portal.find('#welcome-submit-button').simulate('click')
  expect(generateInitialResponses.calledOnce).toBeTruthy()
  expect(portal.props().isOpen).toBeFalsy()
})
