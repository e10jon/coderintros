// @flow

import {action, observable} from 'mobx'
import {persist} from 'mobx-persist'
import uuid from 'uuid/v4'
import 'isomorphic-fetch'

import {getWordpressUrl} from '../helpers/fetch'

// obtain using btoa(user:password)
const Authorization = 'Basic YXV0b21hdGVkOnBhc3N3b3Jk'

class Question {
  @persist id = null
  @persist question = ''
  @persist answer = ''

  constructor (id: string = uuid()) {
    this.id = id
  }
}

class Post {
  @persist('object') @observable content = {rendered: ''}
  @persist('object') @observable excerpt = {rendered: ''}
  @persist('list', Question) @observable questions = [new Question('default')]
  @persist('object') @observable title = {rendered: ''}
  @persist('object') @observable _embedded = {'wp:featuredmedia': []}
  @persist('object') @observable _formatting = {}
  @persist('object') @observable _social_links = {}
}

export default class PostStore {
  questionsData = null
  @persist('object', Post) @observable post = new Post()

  constructor ({questionsData}: {questionsData: Object}) {
    this.questionsData = questionsData
  }

  @action handleAddQuestion = (index: number) => {
    this.post.questions.splice(index + 1, 0, new Question())
  }

  @action handleFeaturedImageDrop = async (files: Array<?Object> = []) => {
    const photoFormData = new global.FormData()
    photoFormData.append('file', files[0])

    const res = await global.fetch(getWordpressUrl('/wp/v2/media'), {
      body: photoFormData,
      headers: {Authorization},
      method: 'POST'
    })
    const json = await res.json()

    // have to adjust the input a little bit so it looks like a regular post
    this.post._embedded['wp:featuredmedia'] = [json]
  }

  @action handleRemoveQuestion = (index: number) => {
    if (this.post.questions.length > 1) {
      this.post.questions.splice(index, 1)
    }
  }

  @action handleTitleChange = (e: Object) => {
    this.post.title.rendered = e.target.innerHTML
  }
}
