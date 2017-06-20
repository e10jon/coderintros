import test from 'ava'

import {getQuestions} from '../../lib/googleapis'

test('loads questions from a google sheet', async t => {
  const questions = await getQuestions()
  t.truthy(questions.length > 1)
  t.deepEqual(Object.keys(questions[0]), ['section', 'questions'])
})
