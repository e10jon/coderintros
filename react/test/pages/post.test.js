import test from 'ava'
import React from 'react'
import {mount} from 'enzyme'

import enableBrowserTesting from '../helpers/enable-browser-testing'
import {createPostsData, createSiteData, createUrl} from '../helpers/initial-props'
import Post from '../../pages/post'

test.before(() => {
  enableBrowserTesting()
})

test('renders', t => {
  const wrapper = mount(
    <Post
      postsData={createPostsData()}
      siteData={createSiteData()}
      url={createUrl()}
    />
  )

  t.truthy(wrapper.find('div').length)
})
