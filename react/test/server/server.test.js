import test from 'ava'
import supertest from 'supertest'

import koa from 'server'

const server = koa.listen(0)
const request = supertest(server)

test('server returns 200', async t => {
  const res = await request.get('/')
  t.is(res.status, 200)
})

test('server returns 404 for invalid paths', async t => {
  const res = await request.get('/this-is-not-a-valid-path')
  t.is(res.status, 404)
})
