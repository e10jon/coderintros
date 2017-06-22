import test from 'ava'

import Store from '../../stores/modal'

test('creates', t => {
  const store = new Store()
  t.truthy(store)
})
