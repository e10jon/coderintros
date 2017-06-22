import test from 'ava'

import Store from '../../stores/editable-interview'

test('creates', t => {
  const store = new Store()
  t.truthy(store)
})
