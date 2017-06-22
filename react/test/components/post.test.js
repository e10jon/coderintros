import test from 'ava'
import React from 'react'

import Post from '../../components/post'

test('renders', t => {
  t.truthy(<Post />)
})
