// @flow

/* global AUTOMATED_JWT_TOKEN */

import React from 'react'
import {action, computed, observable} from 'mobx'
import {create, persist} from 'mobx-persist'
import {renderToStaticMarkup} from 'react-dom/server'
import stripTags from 'striptags'
import uuid from 'uuid/v4'
import 'isomorphic-fetch'

import {getWordpressUrl} from '../helpers/fetch'

const {floor, random} = Math

// to obtain the JWT token, run this:
// curl -X POST http://coderintros.dev/wp-json/jwt-auth/v1/token --data 'username=automated&password=REPLACE_ME'
// to see if the token works, run this:
// curl -X POST http://coderintros.dev/wp-json/jwt-auth/v1/token/validate -H 'Authorization: Bearer REPLACE_ME'
const Authorization = `Bearer ${AUTOMATED_JWT_TOKEN}`

const storeKey = 'NewInterview'

// helper function to extract an edited value from
// form elements or contenteditable elements
const getValue = (e: Object) => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.nodeName)) {
    return e.target.value
  } else {
    return e.target.innerHTML
  }
}

class Response {
  @persist @observable id = ''
  @persist @observable question = ''
  @persist @observable answer = ''

  constructor ({question}: {question: ?string} = {}) {
    this.id = uuid()
    this.question = question
  }
}

class Post {
  type = 'post'

  @persist('object') @observable content = {rendered: ''}
  @persist @observable email = ''
  @persist('object') @observable excerpt = {rendered: ''}
  @persist @observable name = ''
  @persist @observable phone = ''
  @persist('list', Response) @observable responses = []
  @persist('object') @observable title = {rendered: ''}
  @persist('object') @observable _embedded = {'wp:featuredmedia': []}
  @persist('object') @observable _formatting = {}
  @persist('object') @observable _social = {}
}

export default class PostStore {
  questionsData = []

  @observable isFeaturedImageUploading = false
  @observable isSubmitting = false
  @observable didSubmit = false

  @persist('object', Post) @observable post = new Post()

  constructor ({questionsData}: {questionsData: Object}) {
    this.questionsData = questionsData
  }

  @action deleteFromStore = () => {
    global.localStorage.removeItem(storeKey)
  }

  @action generateRandomQuestion = (response: Response) => {
    response.question = this.getRandomQuestionData()
  }

  getRandomQuestionData = () => this.questionsDataFlattened
    ? this.questionsDataFlattened[floor(random() * this.questionsDataFlattened.length)]
    : null

  @action generateRandomResponses = (desired: number = 10) => {
    const actual = desired - this.post.responses.length
    if (actual > 0) {
      for (let i = 0; i <= actual; i += 1) {
        this.post.responses.push(new Response({
          question: this.getRandomQuestionData()
        }))
      }
    }
  }

  getResponseIndex = (response: Response) => this.post.responses.findIndex(r => r.id === response.id)

  @action handleAddResponse = (after: ?Response) => {
    const response = new Response({
      question: this.getRandomQuestionData()
    })

    if (after) {
      this.post.responses.splice(this.getResponseIndex(after) + 1, 0, response)
    } else {
      this.post.responses.push(response)
    }
  }

  @action handleEmailChange = (e: Object) => {
    this.post.email = getValue(e)
  }

  // wordpress will return the excerpt in a <p> tag,
  // so we'll be consistent and do the same
  @action handleExcerptChange = (e: Object) => {
    this.post.excerpt.rendered = `<p>${getValue(e)}</p>`
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

  @action handleNameChange = (e: Object) => {
    this.post.name = getValue(e)
  }

  @action handlePhoneChange = (e: Object) => {
    this.post.phone = getValue(e)
  }

  @action handleResponseUpdate = ({response, attr}: {response: Object, attr: 'question' | 'answer'}, e: Object) => {
    response[attr] = getValue(e)
  }

  @action handleRemoveResponse = (response: Response) => {
    this.post.responses.splice(this.getResponseIndex(response), 1)
  }

  @action handleSubmit = async (e: ?Object, {gRecaptchaResponse}: {gRecaptchaResponse: ?string} = {}) => {
    if (e) {
      e.preventDefault()
    }

    this.isSubmitting = true
    this.didSubmit = false

    const allowedHtmlTags = ['a', 'b', 'br', 'div', 'em', 'i', 'p', 'strong']

    const content: string = this.post.responses.reduce((els, response) => els.concat(
      renderToStaticMarkup(<p><strong>{response.question}</strong></p>),
      renderToStaticMarkup(<p dangerouslySetInnerHTML={{__html: stripTags(response.answer, allowedHtmlTags)}} />)
    ), []).join('')

    await global.fetch(getWordpressUrl('/wp/v2/posts'), {
      body: JSON.stringify({
        content,
        email: this.post.email,
        excerpt: stripTags(this.post.excerpt.rendered),
        featured_media: this.post._embedded['wp:featuredmedia'][0].id,
        name: this.post.name,
        phone: this.post.phone,
        status: 'pending',
        title: this.post.name
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

    this.deleteFromStore()
  }

  @action loadFromStore = () => {
    create()(storeKey, this)
  }

  @computed get questionsDataFlattened (): Array<string> {
    return this.questionsData.reduce((arr, section) => arr.concat(section.questions), [])
  }
}
