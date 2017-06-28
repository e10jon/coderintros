import 'isomorphic-fetch'

const host = 'http://coderintros.dev'

test('GET /wp-json/ci/site_details', async () => {
  const res = await global.fetch(`${host}/wp-json/ci/site_details`)
  expect(res.status).toBe(200)
})
