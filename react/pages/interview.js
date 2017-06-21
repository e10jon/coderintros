// @flow

import React, {Component} from 'react'
import {observable, action, autorun} from 'mobx'
import {observer} from 'mobx-react'
import PropTypes from 'prop-types'
import {renderToStaticMarkup} from 'react-dom/server'
import 'isomorphic-fetch'

import createPage from '../helpers/create-page'
import NavButton from '../components/interview/nav-button'
import {getWordpressUrl} from '../helpers/fetch'

// obtain using btoa(user:password)
const Authorization = 'Basic YXV0b21hdGVkOnBhc3N3b3Jk'

const createStore = ({steps}: Object) => {
  const store = observable({
    activeStep: steps[0],
    prevStep: null,
    nextStep: 1,
    isDone: false,
    isSubmitting: false,
    didSubmit: false,
    steps,
    beginSubmission: action(function beginSubmission () {
      this.isSubmitting = true
      this.didSubmit = false
    }),
    endSubmission: action(function endSubmission () {
      this.isSubmitting = false
      this.didSubmit = true
    }),
    changeStep: action(function changeStep (step: number) {
      this.activeStep = step
    }),
    finish: action(function finish () {
      this.isDone = true
    })
  })

  autorun(() => {
    const activeIndex = store.steps.indexOf(store.activeStep)
    store.prevStep = activeIndex - 1 < 0 ? null : store.steps[activeIndex - 1]
    store.nextStep = activeIndex + 1 < store.steps.length ? store.steps[activeIndex + 1] : null
  })

  store.handlePrevStepClick = action(() => {
    store.changeStep(store.prevStep)
  })
  store.handleNextStepClick = action(() => {
    store.changeStep(store.nextStep)
  })

  return store
}

class Interview extends Component {
  static childContextTypes = {
    interviewStore: PropTypes.object
  }

  getChildContext = () => ({
    interviewStore: this.store
  })

  componentWillMount () {
    this.store = createStore({
      steps: [
        'Welcome',
        ...this.props.questionsData.map(d => d.section),
        'Photo',
        'Confirm'
      ]
    })
  }

  handleSectionNavClick = (section: string) => {
    console.log(section)
  }

  handleSubmit = async (e: Object) => {
    e.preventDefault()

    if (this.store.isSubmitting) {
      return
    }

    this.store.beginSubmission()

    const photoFormData = new global.FormData()
    let name
    let htmlEls = []

    for (let node of e.target.querySelectorAll('input, textarea')) {
      if (node.name === 'email') {
        htmlEls.push(<p key='Email'>{node.value}</p>)
      } else if (node.name === 'name') {
        name = node.value
      } else if (node.name === 'photo') {
        photoFormData.append('file', node.files[0])
      } else {
        if (node.value) {
          htmlEls.push(<p key={`Question${node.name}`}><strong>{node.name}</strong></p>)
          htmlEls.push(<p key={`Answer${node.name}`}>{node.value}</p>)
        }
      }
    }

    const photoUploadRes = await global.fetch(getWordpressUrl('/wp/v2/media'), {
      body: photoFormData,
      headers: {Authorization},
      method: 'POST'
    })

    const photoUploadResJson = await photoUploadRes.json()

    await global.fetch(getWordpressUrl('/wp/v2/posts'), {
      body: JSON.stringify({
        content: renderToStaticMarkup(<div>{htmlEls}</div>),
        featured_media: photoUploadResJson.id,
        status: 'pending',
        title: name
      }),
      headers: {
        Authorization,
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    this.store.endSubmission()
    this.store.finish()
  }

  store: Object

  render () {
    return (
      <main className='max-width-3 mx-auto center'>
        <div className='page-x-spacing'>
          <h1>{'The Interview'}</h1>

          {this.store.isDone ? (
            <div>{'Thank you!'}</div>
          ) : (
            <div>
              <div>
                <span>{`Submission status: `}</span>
                {this.store.isSubmitting ? <span>{'submitting...'}</span> : null}
                {this.store.didSubmit ? <span>{'done!'}</span> : null}
              </div>

              <nav className='my2'>
                {this.store.steps.map(section => (
                  <NavButton
                    key={`NavButton${section}`}
                    section={section}
                  />
                ))}
              </nav>

              <form onSubmit={this.handleSubmit}>
                <fieldset className={this.store.activeStep === 'Welcome' ? '' : 'hide'}>
                  <div className='h3 bold'>{'Setup'}</div>
                  <div>
                    <label>{'Name'}</label>
                    <input
                      className='input'
                      name='name'
                      readOnly
                      required
                      type='text'
                      value={this.props.url.query.name}
                    />
                  </div>
                  <div>
                    <label>{'Email'}</label>
                    <input
                      className='input'
                      name='email'
                      readOnly
                      required
                      type='email'
                      value={this.props.url.query.email}
                    />
                  </div>
                </fieldset>

                {this.props.questionsData.map(questionData => (
                  <fieldset
                    className={this.store.activeStep === questionData.section ? '' : 'hide'}
                    key={`Section${questionData.section}`}
                  >
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
                  </fieldset>
                ))}

                <fieldset className={this.store.activeStep === 'Photo' ? '' : 'hide'}>
                  <div className='h3 bold'>{'Photo'}</div>
                  <div>
                    <label className='label'>{'Photo'}</label>
                    <input
                      name='photo'
                      required
                      type='file'
                    />
                  </div>
                </fieldset>

                <fieldset className={this.store.activeStep === 'Confirm' ? '' : 'hide'}>
                  <button
                    className='btn btn-primary'
                    type='submit'
                  >
                    {'Submit'}
                  </button>
                </fieldset>
              </form>

              <nav className='my2'>
                {this.store.prevStep !== null ? (
                  <a
                    className='inline-block px1 mx1 underline'
                    dangerouslySetInnerHTML={{__html: '&laquo; Prev'}}
                    href='javascript:void(0)'
                    onClick={this.store.handlePrevStepClick}
                  />
                ) : null}

                {this.store.nextStep !== null ? (
                  <a
                    className='inline-block px1 mx1 underline'
                    dangerouslySetInnerHTML={{__html: 'Next &raquo;'}}
                    href='javascript:void(0)'
                    onClick={this.store.handleNextStepClick}
                  />
              ) : null}
              </nav>
            </div>
          )}
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
