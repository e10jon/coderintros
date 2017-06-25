// @flow

import React from 'react'

import createModal from '../../helpers/create-modal'

const InterviewModal = () => (
  <div className='m2'>
    <h1>{'Welcome!'}</h1>
  </div>
)

export default createModal(InterviewModal, {isOpen: true})
