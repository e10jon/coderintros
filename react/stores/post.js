// @flow

import React from 'react'
import {action, observable} from 'mobx'
import {persist} from 'mobx-persist'
import {renderToStaticMarkup} from 'react-dom/server'
import uuid from 'uuid/v4'
import 'isomorphic-fetch'

import {getWordpressUrl} from '../helpers/fetch'

// obtain using btoa(user:password)
const Authorization = 'Basic YXV0b21hdGVkOnBhc3N3b3Jk'

class Response {
  @persist @observable id = null
  @persist @observable question = ''
  @persist @observable answer = ''

  constructor (id: string = uuid()) {
    this.id = id
  }
}

class Post {
  type = 'post'

  @persist('object') @observable content = {rendered: ''}
  @persist('object') @observable excerpt = {rendered: ''}
  @persist('list', Response) @observable responses = [new Response('default')]
  @persist('object') @observable title = {rendered: ''}
  @persist('object') @observable _embedded = {'wp:featuredmedia': []}
  @persist('object') @observable _formatting = {}
  @persist('object') @observable _social_links = {}
}

export default class PostStore {
  questionsData = null

  @observable isFeaturedImageUploading = null
  @observable isSubmitting = null
  @observable didSubmit = null

  @persist('object', Post) @observable post = new Post()

  constructor ({questionsData}: {questionsData: Object}) {
    this.questionsData = questionsData
  }

  @action handleAddResponse = (index: number) => {
    this.post.responses.splice(index + 1, 0, new Response())
  }

  @action handleExcerptChange = (e: Object) => {
    this.post.excerpt.rendered = e.target.innerHTML
  }

  @action handleFeaturedImageDrop = async (files: Array<?Object> = []) => {
    this.isFeaturedImageUploading = true

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

    this.isFeaturedImageUploading = false
  }

  @action handleResponseUpdate = ({response, attr}: {response: Object, attr: 'question' | 'answer'}, e: Object) => {
    response[attr] = e.target.innerHTML
  }

  @action handleRemoveResponse = (index: number) => {
    if (this.post.responses.length > 1) {
      this.post.responses.splice(index, 1)
    }
  }

  @action handleSubmit = async (e: ?Object, {gRecaptchaResponse}: {gRecaptchaResponse: ?string} = {}) => {
    if (e) {
      e.preventDefault()
    }

    this.isSubmitting = true
    this.didSubmit = false

    const content: string = this.post.responses.reduce((els, response) => els.concat(
      renderToStaticMarkup(<p><strong>{response.question}</strong></p>),
      renderToStaticMarkup(<p>{response.answer}</p>)
    ), []).join('')

    await global.fetch(getWordpressUrl('/wp/v2/posts'), {
      body: JSON.stringify({
        content,
        // email,
        excerpt: this.post.excerpt.rendered,
        featured_media: this.post._embedded['wp:featuredmedia'][0].id,
        // phone,
        status: 'pending',
        title: this.post.title.rendered
      }),
      headers: {
        Authorization,
        'Content-Type': 'application/json',
        'X-G-Recaptcha-Response': gRecaptchaResponse
      },
      method: 'POST'
    })

    this.isSubmitting = false
    this.didSubmit = true
  }

  @action handleTitleChange = (e: Object) => {
    this.post.title.rendered = e.target.innerHTML
  }
}
