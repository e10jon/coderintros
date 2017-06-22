import test from 'ava'
import 'isomorphic-fetch'

test('/health', async t => {
  const res = await global.fetch('http://coderintros.dev/health')
  t.is(res.status, 200)
})

test('BAN /', async t => {
  const res = await global.fetch('http://coderintros.dev/', {method: 'BAN'})
  t.is(res.status, 200)
})
