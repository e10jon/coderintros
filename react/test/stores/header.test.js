import test from 'ava'

import Store from '../../stores/header'

test('creates', t => {
  const store = new Store()
  t.truthy(store)
})
