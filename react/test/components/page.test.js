import test from 'ava'
import React from 'react'

import createPage from '../../components/page'

test('renders', t => {
  t.truthy(createPage(<div />))
})
