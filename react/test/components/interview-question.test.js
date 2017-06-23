import test from 'ava'
import React from 'react'

import InterviewQuestion from '../../components/interview-question'

test('renders', t => {
  t.truthy(<InterviewQuestion />)
})
