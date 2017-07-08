// @flow

import React, {Component} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'
import ReactModal from 'react-modal'
import {IoClose} from 'react-icons/lib/io'

import ModalStore from '../stores/modal'
import trackEvent from '../helpers/track-event'

@observer
export default function (Child: Object, {isOpen, hideCloseButton, maxWidth = 2}: {isOpen?: boolean, hideCloseButton?: boolean, maxWidth?: number} = {}) {
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

    handleKeyUp = (e: Object) => {
      // escape key
      if (e.keyCode === 27 && this.props.store.isOpen) {
        this.props.store.close()
        trackEvent({
          eventCategory: 'Modals',
          eventAction: `Dismissed ${Child.displayName} Via Escape Key`
        })
      }
    }

    props: {
      store: MobxReactPropTypes.observableObject
    }

    render () {
      return (
        <ReactModal
          className='absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center sans-serif'
          closeTimeoutMS={200}
          contentLabel='modal'
          isOpen={this.props.store.isOpen}
          overlayClassName='fixed top-0 right-0 bottom-0 left-0 z2 flex justify-center items-center'
        >
          <div className={`bg-white m2 relative col-12 max-width-${maxWidth}`}>
            <Child store={this.props.store} />

            {!hideCloseButton ? (
              <a
                className='absolute block gray modal-close-btn p1'
                data-ga-event-action={`Dismissed ${Child.displayName} Via Close Button`}
                data-ga-event-category='Modals'
                data-ga-on='click'
                href='javascript:void(0)'
                onClick={this.props.store.handleClose}
              >
                <IoClose />
              </a>
            ) : null}
          </div>
        </ReactModal>
      )
    }
  }

  return Modal
}
