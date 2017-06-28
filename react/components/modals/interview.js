// @flow

import React from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'
import stripTags from 'striptags'

import createModal from '../../helpers/create-modal'

const InterviewModal = observer(({store}: {store: Object}, {postStore}: {postStore: Object}) => {
  const handleButtonClick = () => {
    postStore.generateRandomResponses(10)
    store.close()
  }

  const slideTitle = (text: string) => <div className='my2 h2 line-height-3'>{text}</div>

  return (
    <div className='m2'>
      <div className={store.slideClassName(0)}>
        {slideTitle('Welcome!')}

        <div className='my2'>{'Use this page to create your own interview.'}</div>
      </div>

      <div className={store.slideClassName(1)}>
        {slideTitle("What's your full name?")}

        <div>
          <input
            className='input'
            onChange={postStore.handleNameChange}
            type='text'
            value={postStore.post.name}
          />
        </div>
      </div>

      <div className={store.slideClassName(2)}>
        {slideTitle('And how can we get in touch with you?')}

        <div>
          <label
            className='label'
            htmlFor='#email'
          >
            {'Your email'}
          </label>
          <input
            className='input'
            onChange={postStore.handleEmailChange}
            type='email'
            value={postStore.post.email}
          />
        </div>

        <div>
          <label
            className='label'
            htmlFor='#phone'
          >
            {'Your phone'}
          </label>
          <input
            className='input'
            onChange={postStore.handlePhoneChange}
            type='tel'
            value={postStore.post.phone}
          />
        </div>
      </div>

      <div className={store.slideClassName(3)}>
        {slideTitle(`In a short paragraph, tell us about ${postStore.post.name}.`)}

        <div>
          <textarea
            className='input'
            onChange={postStore.handleExcerptChange}
            placeholder={`${postStore.post.name} is the founder of So-and-So. He/she was a senior employee at Somewhere for X years...`}
            style={{minHeight: '90px'}}
            value={stripTags(postStore.post.excerpt.rendered)}
          />
        </div>
      </div>

      <div className='flex justify-between'>
        {store.showPrevButton ? (
          <button
            className='btn btn-outline'
            onClick={store.handlePrevSlideClick}
            type='submit'
          >
            {'Prev'}
          </button>
        ) : <div />}

        {store.showNextButton ? (
          <button
            className='btn btn-outline'
            onClick={store.handleNextSlideClick}
            type='submit'
          >
            {'Next'}
          </button>
        ) : (
          <button
            className='btn btn-primary'
            onClick={handleButtonClick}
            type='submit'
          >
            {'Get started'}
          </button>
        )}
      </div>
    </div>
  )
})

InterviewModal.contextTypes = {
  postStore: MobxReactPropTypes.observableObject
}

export default createModal(InterviewModal, {
  isOpen: true,
  hideCloseButton: true
})
