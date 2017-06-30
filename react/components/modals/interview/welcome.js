// @flow

import React from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'

import createModal from '../../../helpers/create-modal'

const Welcome = observer(({store}: {store: Object}, {postStore}: {postStore: Object}) => {
  const handleButtonClick = () => {
    postStore.generateRandomResponses(10)
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
    <div className='m2'>
      <div className='my2 h2 line-height-3'>{'Welcome!'}</div>

      <video
        autoPlay
        className='block fit my2'
        controls
        loop
        onClick={handleVideoClick}
        playsInline
        src='//cf.coderintros.com/interview-tutorial.mp4'
      />

      <div className='center'>
        <button
          className='btn btn-primary'
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
  isOpen: true
})
