import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import { renderRoot } from 'client'

test('client renders into root element', t => {
  t.is(typeof renderRoot, 'function')
  t.is(document.getElementById('root').innerHTML, '<!-- react-empty: 1 -->')
})
