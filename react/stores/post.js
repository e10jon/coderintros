// @flow

/* global AUTOMATED_JWT_TOKEN */

import React from 'react'
import {action, autorun, computed, observable} from 'mobx'
import {create, persist} from 'mobx-persist'
import {renderToStaticMarkup} from 'react-dom/server'
import stripTags from 'striptags'
import uuid from 'uuid/v4'
import 'isomorphic-fetch'

import {getWordpressUrl} from '../helpers/fetch'

const {floor, random} = Math

// to obtain the JWT token, run this:
// curl -X POST http://coderintros.dev/wp-json/jwt-auth/v1/token --data 'username=automated&password=password'
// to see if the token works, run this:
// curl -X POST http://coderintros.dev/wp-json/jwt-auth/v1/token/validate -H 'Authorization: Bearer REPLACE_ME'
const Authorization = `Bearer ${AUTOMATED_JWT_TOKEN}`

const storeKey = 'NewInterview'

export const minResponsesRequired = 10

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
  @persist('object') @observable excerpt = {rendered: ''}
  @persist('object') @observable _embedded = {'wp:featuredmedia': []}

  @persist('list', Response) @observable responses = []

  @observable _formatting = {}
  @observable _social = {}

  @observable title = {rendered: 'Your Interview'}

  @persist @observable current_location = ''
  @persist @observable email = ''
  @persist @observable employer = ''
  @persist @observable facebook_url = ''
  @persist @observable github_url = ''
  @persist @observable hometown_location = ''
  @persist @observable job_title = ''
  @persist @observable linkedin_url = ''
  @persist @observable name = ''
  @persist @observable personal_url = ''
  @persist @observable phone = ''
  @persist @observable twitter_url = ''

  @computed get completedResponses (): Array<Response> {
    return this.responses.filter(r => !!r.answer)
  }
}

const filterEmptyQuestions = (questionsData?: Object) => {
  return questionsData ? questionsData.reduce((arr, questionData) => (
    arr.concat({
      section: questionData.section,
      questions: questionData.questions.filter(q => q.length)
    })
  ), []) : questionsData
}

export default class PostStore {
  questionsData = []

  @observable didError = false
  @observable didFeaturedImageUploadError = false
  @observable didSubmit = false
  @observable errorMessage = ''
  @observable isFeaturedImageUploading = false
  @observable isSubmitting = false
  @observable lastUpdatedAt = new Date().toString()

  @persist('object', Post) @observable post = new Post()

  constructor ({questionsData}: {questionsData?: Object} = {}) {
    this.questionsData = filterEmptyQuestions(questionsData)

    autorun(() => {
      // is there a better way to observe the post?
      if (JSON.stringify(this.post)) {
        this.lastUpdatedAt = new Date().toString()
      }
    })
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

  @action generateInitialResponses = () => {
    if (!this.post.responses.length) {
      // add all the required questions
      if (this.questionsData) {
        this.questionsData[0].questions.forEach(question =>
          this.post.responses.push(new Response({question}))
        )
      }

      // add 1 random question
      this.post.responses.push(new Response({
        question: this.getRandomQuestionData()
      }))
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

  @action handleEmployerChange = (e: Object) => {
    this.post.employer = getValue(e)
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

    try {
      const res = await global.fetch(getWordpressUrl('/wp/v2/media'), {
        body: photoFormData,
        headers: {Authorization},
        method: 'POST'
      })
      const json = await res.json()

      // have to adjust the input a little bit so it looks like a regular post
      this.post._embedded['wp:featuredmedia'] = [json]
    } catch (e) {
      this.post._embedded['wp:featuredmedia'] = []
      this.didFeaturedImageUploadError = true
    }

    this.isFeaturedImageUploading = false
  }

  @action handleCurrentLocationChange = (e: Object) => {
    this.post.current_location = getValue(e)
  }

  @action handleHometownLocationChange = (e: Object) => {
    this.post.hometown_location = getValue(e)
  }

  @action handleNameChange = (e: Object) => {
    this.post.name = getValue(e)
  }

  @action handleJobTitleChange = (e: Object) => {
    this.post.job_title = getValue(e)
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

    this.didError = false
    this.isSubmitting = true
    this.didSubmit = false

    const allowedHtmlTags = ['a', 'b', 'br', 'div', 'em', 'i', 'p', 'strong']

    const content: string = this.post.completedResponses.reduce((els, response) => els.concat(
      renderToStaticMarkup(<p><strong>{response.question}</strong></p>),
      renderToStaticMarkup(<p dangerouslySetInnerHTML={{__html: stripTags(response.answer, allowedHtmlTags)}} />)
    ), []).join('')

    try {
      await global.fetch(getWordpressUrl('/wp/v2/posts'), {
        body: JSON.stringify({
          content,
          current_location: this.post.current_location,
          email: this.post.email,
          employer: this.post.employer,
          excerpt: stripTags(this.post.excerpt.rendered),
          facebook_url: this.post.facebook_url,
          featured_media: this.post._embedded['wp:featuredmedia'][0].id,
          hometown_location: this.post.hometown_location,
          linkedin_url: this.post.linkedin_url,
          job_title: this.post.job_title,
          name: this.post.name,
          personal_url: this.post.personal_url,
          phone: this.post.phone,
          status: 'pending',
          title: this.post.name,
          twitter_url: this.post.twitter_url
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
    } catch (e) {
      this.isSubmitting = false
      this.didError = true

      this.errorMessage = e.message
    }
  }

  @action handleFacebookUrlChange = (e: Object) => { this.post.facebook_url = getValue(e) }
  @action handleLinkedInUrlChange = (e: Object) => { this.post.linkedin_url = getValue(e) }
  @action handlePersonalUrlChange = (e: Object) => { this.post.personal_url = getValue(e) }
  @action handleTwitterUrlChange = (e: Object) => { this.post.twitter_url = getValue(e) }

  @computed get isCurrentLocationValid (): boolean {
    return !!this.post.current_location.length
  }

  @computed get isEmailValid (): boolean {
    return !!this.post.email.length
  }

  @computed get isExcerptValid (): boolean {
    return !!this.post.excerpt.rendered.length
  }

  @computed get isNameValid (): boolean {
    return !!this.post.name.length
  }

  @computed get isJobTitleValid (): boolean {
    return !!this.post.job_title.length
  }

  @computed get isPhotoValid (): boolean {
    return !!this.post._embedded['wp:featuredmedia'].length
  }

  @computed get isResponsesLengthValid (): boolean {
    return this.post.completedResponses.length >= minResponsesRequired
  }

  @computed get isValid (): boolean {
    return this.isEmailValid &&
      this.isCurrentLocationValid &&
      this.isExcerptValid &&
      this.isJobTitleValid &&
      this.isNameValid &&
      this.isPhotoValid &&
      this.isResponsesLengthValid
  }

  @action loadFromStore = () => {
    create()(storeKey, this)
  }

  @computed get questionsDataFlattened (): Array<string> {
    return this.questionsData ? this.questionsData.reduce((arr, section) => arr.concat(section.questions), []) : []
  }
}
