import test from 'ava'
import React from 'react'
import {shallow} from 'enzyme'

import enableBrowserTesting from '../helpers/enable-browser-testing'
import {createPostsData, createSiteData, createUrl} from '../helpers/initial-props'
import Singular from '../../pages/singular'

test.before(() => {
  enableBrowserTesting()
})

test('renders', t => {
  const wrapper = shallow(
    <Singular
      postsData={createPostsData()}
      siteData={createSiteData()}
      url={createUrl()}
    />
  )

  t.truthy(wrapper.find('div').length)
})
