// @flow

import React from 'react'

import createModal from '../../helpers/create-modal'

const InterviewModal = ({store}: {store: Object}) => {
  const handleButtonClick = () => {
    store.close()
  }

  return (
    <div className='m2'>
      <h1 className='my2'>{'Welcome!'}</h1>

      <div className='my2'>{'Use this page to create your own interview.'}</div>

      <div className='my2'>
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
}

export default createModal(InterviewModal, {isOpen: true})
