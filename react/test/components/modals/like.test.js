import test from 'ava'
import React from 'react'

import LikeModal from '../../../components/modals/like'

test('renders', t => {
  t.truthy(<LikeModal />)
})
