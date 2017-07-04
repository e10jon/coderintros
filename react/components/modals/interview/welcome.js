// @flow

import React from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'

import createModal from '../../../helpers/create-modal'

const Welcome = observer(({store}: {store: Object}, {postStore}: {postStore: Object}) => {
  const handleButtonClick = () => {
    postStore.generateRandomResponses()
    store.close()
  }

  const handleVideoClick = (e: Object) => {
    if (e.target.paused) {
      e.target.play()
    } else {
      e.target.pause()
    }
  }

  return (
    <div className='pt3 px3 pb2 bg-darken-0'>
      <div className='h2 bold line-height-3 mb2'>{'Welcome to your interview!'}</div>

      <video
        autoPlay
        className='block fit my2 border border-gray'
        controls
        loop
        onClick={handleVideoClick}
        playsInline
        src='//cf.coderintros.com/interview-tutorial.mp4'
      />

      <div className='center'>
        <button
          className='btn btn-primary btn-big h3'
          onClick={handleButtonClick}
          type='submit'
        >
          {'Get started'}
        </button>
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
