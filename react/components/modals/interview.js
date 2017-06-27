// @flow

import React from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'
import stripTags from 'striptags'

import createModal from '../../helpers/create-modal'

const InterviewModal = observer(({store}: {store: Object}, {postStore}: {postStore: Object}) => {
  const handleButtonClick = () => {
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
        {slideTitle("In just a few sentences, tell us what you're best known for:")}

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
