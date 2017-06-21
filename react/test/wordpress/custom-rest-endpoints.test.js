import test from 'ava'
import 'isomorphic-fetch'

const fetchJson = async (path, opts = {}) => {
  const url = `http://coderintros.dev/wp-json${path}`
  const res = await global.fetch(url, opts)
  const json = await res.json()
  return json
}

test('/ci/site_details', async t => {
  const json = await fetchJson('/ci/site_details')
  t.truthy(Object.keys(json).length > 5)
})

test('/ci/purge_all_caches', async t => {
  const json = await fetchJson('/ci/purge_all_caches', {
    method: 'DELETE'
  })
  t.falsy(json)
})

test('/ci/questions', async t => {
  const json = await fetchJson('/ci/questions')
  t.truthy(json.length >= 2)
  t.deepEqual(Object.keys(json[0]), ['section', 'questions'])
  t.truthy(json[0].questions.length >= 3)
})
