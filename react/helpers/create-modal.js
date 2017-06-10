// @flow

import React, {Component} from 'react'
import ReactModal from 'react-modal'

export default function (Child) {
  class Modal extends Component {
    render () {
      return (
        <ReactModal
          className='absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center'
          contentLabel='modal'
          isOpen
          overlayClassName='fixed top-0 right-0 bottom-0 left-0 z2 bg-silver flex justify-center items-center'
        >
          <Child />
        </ReactModal>
      )
    }
  }

  return Modal
}
