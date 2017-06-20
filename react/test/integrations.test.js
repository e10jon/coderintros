import test from 'ava'
import 'isomorphic-fetch'

const host = 'http://coderintros.dev'

test('loads /', async t => {
  const res = await global.fetch(host)
  t.is(res.status, 200)
})

test('loads /profiles/:slug', async t => {
  const res = await global.fetch(`${host}/profiles/ethan-jon`)
  t.is(res.status, 200)
})

test('loads /:slug', async t => {
  const res = await global.fetch(`${host}/sample-page`)
  t.is(res.status, 200)
})
