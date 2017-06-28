import 'isomorphic-fetch'

const host = 'http://coderintros.dev'

test('GET /', async () => {
  const res = await global.fetch(host)
  expect(res.status).toBe(200)
})
