import React from 'react'
import {mount} from 'enzyme'

import ThankYouModal from '../../components/modals/interview/thank-you'
import WelcomeModal from '../../components/modals/interview/welcome'
import Post from '../../components/post'
import Page, {Interview} from '../../pages/interview'
import PostStore from '../../stores/post'

test('renders', () => {
  const page = mount(
    <Page
      questionsData={[{section: 'test', questions: ['test']}]}
      siteData={{images: {}}}
    />
  )
  const component = page.find(Interview)

  expect(page.html().length).toBeTruthy()
  expect(page.find(Post).length).toBe(1)
  expect(page.find(WelcomeModal).length).toBe(1)
  expect(page.find(ThankYouModal).length).toBe(0)

  const store = component.getNode().postStore
  expect(store).toBeInstanceOf(PostStore)
  expect(store.questionsData[0].section).toBe('test')
})
