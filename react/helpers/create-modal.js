// @flow

import React, {Component} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'
import Head from 'next/head'
import ReactModal from 'react-modal'
import {IoClose} from 'react-icons/lib/io'

import styles from '../styles/modal.scss'
import trackEvent from '../helpers/track-event'

@observer
export default function (Child: Object) {
  class Modal extends Component {
    static displayName = `${Child.displayName}Modal`

    props: {
      store: MobxReactPropTypes.observableObject
    }

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

  return Modal
}
