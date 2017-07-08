// @flow

import React from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'
import {
  // IoIosArrowBack as LeftArrow,
  IoIosArrowForward as RightArrow
} from 'react-icons/lib/io'

import createModal from '../../../helpers/create-modal'

const Welcome = observer(({store}: {store: Object}, {postStore}: {postStore: Object}) => {
  const handleButtonClick = () => {
    postStore.generateInitialResponses()
    store.close()
  }

  const handleKeyDown = (e: Object) => {
    if (e.keyCode === 13) {
      store.handleNextSlideClick()
    }
  }

  const handleVideoClick = (e: Object) => {
    if (e.target.paused) {
      e.target.play()
    } else {
      e.target.pause()
    }
  }

  const slideTitle = (text: string | Object) => <div className='h2 bold line-height-3 mb2'>{text}</div>

  return (
    <div className='pt3 px3 pb2 bg-darken-0'>
      <div className={store.slideClassName(0)}>
        {slideTitle('Welcome to your interview!')}

        <video
          autoPlay
          className='block fit my2 border border-gray'
          controls
          loop
          onClick={handleVideoClick}
          playsInline
          src='//cf.coderintros.com/interview-tutorial-1.mp4'
        />
      </div>

      <div className={store.slideClassName(1)}>
        {slideTitle("What's your full name?")}

        <div>
          <input
            className='input h3'
            onChange={postStore.handleNameChange}
            onKeyDown={handleKeyDown}
            placeholder='Pat Riley'
            type='text'
            value={postStore.post.name}
          />
        </div>
      </div>

      <div className={store.slideClassName(2)}>
        {slideTitle(
          <div>
            <span>{'What\'s your email address? '}</span>
            <span className='h3'>{'(will not be published)'}</span>
          </div>
        )}

        <div>
          <input
            className='input h3'
            onChange={postStore.handleEmailChange}
            onKeyDown={handleKeyDown}
            placeholder='you@domain.com'
            type='email'
            value={postStore.post.email}
          />
        </div>
      </div>

      <div className={store.slideClassName(3)}>
        {slideTitle('How about your current area of residence?')}

        <div>
          <input
            className='input h3'
            onChange={postStore.handleCurrentLocationChange}
            onKeyDown={handleKeyDown}
            placeholder='Coderville, CA'
            type='text'
            value={postStore.post.current_location}
          />
        </div>
      </div>

      <div className={store.slideClassName(4)}>
        {slideTitle('Now it\'s time for the good questions...')}

        <video
          autoPlay
          className='block fit my2 border border-gray'
          controls
          loop
          onClick={handleVideoClick}
          playsInline
          src='//cf.coderintros.com/interview-tutorial-2.mp4'
        />
      </div>

      <div className='flex justify-end'>
        {/*
        {store.showPrevButton ? (
          <button
            className='btn btn-primary pl1'
            onClick={store.handlePrevSlideClick}
            type='submit'
          >
            <LeftArrow />
            <span className='align-middle'>{'Prev'}</span>
          </button>
        ) : <div />} */}

        {store.showNextButton ? (
          <button
            className='btn btn-primary pr1'
            onClick={store.handleNextSlideClick}
            type='submit'
          >
            <span className='align-middle'>{'Next'}</span>
            <RightArrow />
          </button>
        ) : (
          <button
            className='btn btn-primary'
            onClick={handleButtonClick}
            type='submit'
          >
            {'Continue'}
          </button>
        )}
      </div>
    </div>
  )
})

Welcome.contextTypes = {
  postStore: MobxReactPropTypes.observableObject
}

export default createModal(Welcome, {
  hideCloseButton: true,
  isOpen: true,
  maxWidth: 3
})
