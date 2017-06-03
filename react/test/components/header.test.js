import test from 'ava'
import React from 'react'

import Header from '../../components/header'

test('renders', t => {
  t.truthy(<Header />)
})
