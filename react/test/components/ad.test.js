import test from 'ava'
import React from 'react'

import Ad from '../../components/ad'

test('renders', t => {
  t.truthy(<Ad />)
})
