import test from 'ava'

import Store from '../../stores/post'

test('creates', t => {
  const store = new Store()
  t.truthy(store)
})
