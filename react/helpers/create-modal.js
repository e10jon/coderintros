// @flow

import React, {Component} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'
import Head from 'next/head'
import ReactModal from 'react-modal'
import {IoClose} from 'react-icons/lib/io'

import ModalStore from '../stores/modal'
import styles from '../styles/modal.scss'
import trackEvent from '../helpers/track-event'

@observer
export default function (Child: Object, {isOpen, hideCloseButton}: {isOpen?: boolean, hideCloseButton?: boolean} = {}) {
  class Modal extends Component {
    static defaultProps = {
      store: new ModalStore({isOpen})
    }

    static displayName = `${Child.displayName}Modal`

    componentDidMount () {
      if (!hideCloseButton) {
        window.addEventListener('keyup', this.handleKeyUp)
      }
    }

    componentWillUnmount () {
      if (!hideCloseButton) {
        window.removeEventListener('keyup', this.handleKeyUp)
      }
    }

    handleCloseClick = () => {
      this.props.store.close()
      trackEvent({
        eventCategory: 'Modals',
        eventAction: `Dismissed ${Child.displayName}`
      })
    }

    handleKeyUp = (e: Object) => {
      if (e.code === 'Escape' && this.props.store.isOpen) {
        this.handleCloseClick()
      }
    }

    props: {
      store: MobxReactPropTypes.observableObject
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
            overlayClassName='fixed top-0 right-0 bottom-0 left-0 z2 flex justify-center items-center'
          >
            <div
              className='bg-white m2 relative col-12'
              style={{maxWidth: '32rem'}}
            >
              <Child store={this.props.store} />

              {!hideCloseButton ? (
                <a
                  className='absolute block gray modal-close-btn p1'
                  href='javascript:void(0)'
                  onClick={this.handleCloseClick}
                >
                  <IoClose />
                </a>
              ) : null}
            </div>
          </ReactModal>
        </div>
      )
    }
  }

  return Modal
}
