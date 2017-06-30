// @flow

import React from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'

import createModal from '../../helpers/create-modal'

const InterviewModal = observer(({store}: {store: Object}, {postStore}: {postStore: Object}) => {
  const handleButtonClick = () => {
    postStore.generateRandomResponses(10)
    store.close()
  }

  return (
    <div className='m2'>
      <div>
        <div className='my2 h2 line-height-3'>{'Welcome!'}</div>
        <div className='my2'>{'Use this page to create your own interview.'}</div>
      </div>

      <div>
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

InterviewModal.contextTypes = {
  postStore: MobxReactPropTypes.observableObject
}

export default createModal(InterviewModal, {
  isOpen: true
})
