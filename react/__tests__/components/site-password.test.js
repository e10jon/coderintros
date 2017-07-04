import React from 'react'
import {mount} from 'enzyme'

import SitePassword from '../../components/site-password'
import SitePasswordStore from '../../stores/site-password'

test('renders', () => {
  const component = mount(<SitePassword />, {context: {
    siteData: {},
    sitePasswordStore: new SitePasswordStore()
  }})
  expect(component).toBeTruthy()
})
