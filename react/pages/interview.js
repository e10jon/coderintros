// @flow

import React, {Component} from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import {renderToStaticMarkup} from 'react-dom/server'
import 'isomorphic-fetch'

import createPage from '../helpers/create-page'
import {getWordpressUrl} from '../helpers/fetch'

const createStore = () => observable({
  isSubmitting: false,
  didSubmit: false,
  beginSubmission: action(function beginSubmission () {
    this.isSubmitting = true
    this.didSubmit = false
  }),
  endSubmission: action(function endSubmission () {
    this.isSubmitting = false
    this.didSubmit = true
  })
})

class Interview extends Component {
  componentWillMount () {
    this.store = createStore()
  }

  handleSubmit = async (e: Object) => {
    e.preventDefault()

    if (this.store.isSubmitting) {
      return
    }

    this.store.beginSubmission()

    const photoFormData = new global.FormData()
    const formObj = {}
    let htmlEls = []

    for (let node of e.target.querySelectorAll('input, textarea')) {
      if (node.name === 'email') {
        formObj.email = node.value
      } else if (node.name === 'name') {
        formObj.name = node.value
      } else if (node.name === 'photo') {
        photoFormData.append('file', node.files[0])
      } else {
        htmlEls.push(<p key={`Question${node.name}`}><strong>{node.name}</strong></p>)
        htmlEls.push(<p key={`Answer${node.name}`}>{node.value}</p>)
      }
    }

    if (process.env.NODE_ENV === 'production') {
      const photoUploadRes = await global.fetch(`${getWordpressUrl}/wp-json/wp/v2/media`, {
        body: photoFormData,
        headers: {
          Authorization: `Basic ${global.btoa('uploader:password')}`
        },
        method: 'POST'
      })

      const photoUploadResJson = await photoUploadRes.json()

      formObj.featuredMediaId = photoUploadResJson.id
      formObj.html = renderToStaticMarkup(<div>{htmlEls}</div>)

      await global.fetch('https://hooks.zapier.com/hooks/catch/2307479/9lv27g/', {
        body: JSON.stringify(formObj),
        method: 'POST'
      })
    }

    this.store.endSubmission()
  }

  store: Object

  render () {
    return (
      <main className='max-width-3 mx-auto center'>
        <div className='page-x-spacing'>
          <h1>{'The Interview'}</h1>

          <div>
            <span>{`Submission status: `}</span>
            {this.store.isSubmitting ? <span>{'submitting...'}</span> : null}
            {this.store.didSubmit ? <span>{'done!'}</span> : null}
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className='h3 bold'>{'Setup'}</div>
            <div>
              <label>{'Name'}</label>
              <input
                className='input'
                name='name'
                required
                type='text'
              />
            </div>
            <div>
              <label>{'Email'}</label>
              <input
                className='input'
                name='email'
                required
                type='email'
              />
            </div>
            <div>
              <label className='label'>{'Photo'}</label>
              <input
                name='photo'
                required
                type='file'
              />
            </div>

            {this.props.questionsData.map(questionData => (
              <div key={`Section${questionData.section}`}>
                <div className='h3 bold'>{questionData.section}</div>
                {questionData.questions.map(question => (
                  <div key={question}>
                    <label>{question}</label>
                    <textarea
                      className='input'
                      name={question}
                    />
                  </div>
                ))}
              </div>
            ))}
            <button
              className='btn btn-primary'
              type='submit'
            >
              {'Submit'}
            </button>
          </form>
        </div>
      </main>
    )
  }
}

export default createPage(observer(Interview), {
  propPaths: () => ({
    questionsData: '/ci/questions'
  })
})
