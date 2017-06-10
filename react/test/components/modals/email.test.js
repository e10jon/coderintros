import test from 'ava'
import React from 'react'

import EmailModal from '../../../components/modals/email'

test('renders', t => {
  t.truthy(<EmailModal />)
})
