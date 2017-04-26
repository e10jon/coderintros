import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import { App } from 'app'

test('App renders', t => {
  const component = (
    <App
      archivesLinksRes={{}}
      categoriesRes={{}}
      cookie=''
      pagesRes={{}}
      recentPostsRes={{}}
    />
  )

  const context = { router: {} }

  const wrapper = shallow(component, {context})

  t.is(wrapper.find('div').length, 1)
})
