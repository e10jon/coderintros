import test from 'ava'
import React from 'react'

import Post from '../../pages/post'

test('renders', t => {
  t.truthy(<Post />)
})
