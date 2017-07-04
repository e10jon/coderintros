import React from 'react'
import {mount} from 'enzyme'

import Response from '../../components/response'
import PostStore from '../../stores/post'

test('renders', () => {
  const postStore = new PostStore({questionsData: []})

  postStore.generateRandomResponses(1)

  const component = mount(<Response response={postStore.post.responses[0]} />, {context: {postStore}})
  expect(component).toBeTruthy()
})
