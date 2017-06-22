// @flow

import React, {Component} from 'react'
import Head from 'next/head'
import ReactModal from 'react-modal'
import {action, observable} from 'mobx'
import {IoClose} from 'react-icons/lib/io'
import {observer} from 'mobx-react'

import styles from '../styles/modal.scss'
import trackEvent from '../helpers/track-event'

export const createModalStore = ({isOpen, storeKey}: {isOpen: boolean, storeKey?: string} = {}) => (
  observable({
    isOpen,
    close: action(function close () {
      this.isOpen = false
    }),
    autoOpen: action(function autoOpen () {
      this.isOpen = true
      this.wasAutoOpened = true
    }),
    open: action(function open () {
      this.isOpen = true
    })
  })
)

export default function (Child: Object) {
  class Modal extends Component {
    handleCloseClick = () => {
      this.props.store.close()
      trackEvent({
        eventCategory: 'Modals',
        eventAction: `Dismissed ${Child.displayName}`
      })
    }

    render () {
      return (
        <div>
          <Head>
            <style dangerouslySetInnerHTML={{__html: styles}} />
          </Head>

          <ReactModal
            className='absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center sans-serif'
            closeTimeoutMS={200}
            contentLabel='modal'
            isOpen={this.props.store.isOpen}
            overlayClassName='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center'
          >
            <div
              className='bg-white m2 relative col-12'
              style={{maxWidth: '32rem'}}
            >
              <Child />

              <a
                className='absolute block gray modal-close-btn p1'
                href='javascript:void(0)'
                onClick={this.handleCloseClick}
              >
                <IoClose />
              </a>
            </div>
          </ReactModal>
        </div>
      )
    }
  }

  return observer(Modal)
}
