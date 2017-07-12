// @flow

import React, {PureComponent} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'
import {
  IoIosArrowBack as LeftArrow,
  IoIosArrowForward as RightArrow
} from 'react-icons/lib/io'

import createModal from '../../../helpers/create-modal'
import ModalStore from '../../../stores/modal'
import WelcomeStep from './welcome-step'

@observer
class Welcome extends PureComponent {
  static childContextTypes = {
    store: MobxReactPropTypes.observableObject
  }

  static contextTypes = {
    postStore: MobxReactPropTypes.observableObject
  }

  static displayName = 'Welcome'

  getChildContext = () => ({
    store: this.props.store
  })

  componentWillMount () {
    this.props.store.numSlides = 5
  }

  handleButtonClick = () => {
    this.context.postStore.generateInitialResponses()
    this.props.store.close()
  }

  handleKeyDown = (e: Object) => {
    if (e.keyCode === 13) {
      this.props.store.handleNextSlideClick()
    }
  }

  handleVideoClick = (e: Object) => {
    if (e.target.paused) {
      e.target.play()
    } else {
      e.target.pause()
    }
  }

  props: {
    store: ModalStore
  }

  render () {
    return (
      <div className='pt3 px3 pb2 bg-darken-0'>
        <WelcomeStep
          step={0}
          title=''
        >
          <video
            autoPlay
            className='block fit my2 border border-gray'
            controls
            onClick={this.handleVideoClick}
            playsInline
            src='//cf.coderintros.com/interview-tutorial-1.mp4'
          />
        </WelcomeStep>

        <WelcomeStep
          step={1}
          title="What's your full name?"
        >
          <input
            className='input h3'
            id='welcome-name-input'
            onChange={this.context.postStore.handleNameChange}
            onKeyDown={this.handleKeyDown}
            placeholder='Pat Riley'
            type='text'
            value={this.context.postStore.post.name}
          />
        </WelcomeStep>

        <WelcomeStep
          step={2}
          title={<div><span>{'What\'s your email address? '}</span><span className='h3'>{'(will not be published)'}</span></div>}
        >
          <input
            className='input h3'
            id='welcome-email-input'
            onChange={this.context.postStore.handleEmailChange}
            onKeyDown={this.handleKeyDown}
            placeholder='you@domain.com'
            type='email'
            value={this.context.postStore.post.email}
          />
        </WelcomeStep>

        <WelcomeStep
          step={3}
          title='How about your current area of residence?'
        >
          <input
            className='input h3'
            id='welcome-current-location-input'
            onChange={this.context.postStore.handleCurrentLocationChange}
            onKeyDown={this.handleKeyDown}
            placeholder='Coderville, CA'
            type='text'
            value={this.context.postStore.post.current_location}
          />
        </WelcomeStep>

        <WelcomeStep
          step={4}
          title=''
        >
          <video
            autoPlay
            className='block fit my2 border border-gray'
            controls
            onClick={this.handleVideoClick}
            playsInline
            src='//cf.coderintros.com/interview-tutorial-2.mp4'
          />
        </WelcomeStep>

        <div className='flex justify-between'>
          {this.props.store.showPrevButton ? (
            <button
              className='btn btn-primary muted pl1'
              onClick={this.props.store.handlePrevSlideClick}
              type='submit'
            >
              <LeftArrow />
              <span className='align-middle'>{'Prev'}</span>
            </button>
          ) : <div />}

          {this.props.store.showNextButton ? (
            <button
              className='btn btn-primary pr1'
              id='welcome-next-button'
              onClick={this.props.store.handleNextSlideClick}
              type='submit'
            >
              <span className='align-middle'>{'Next'}</span>
              <RightArrow />
            </button>
          ) : (
            <button
              className='btn btn-primary'
              id='welcome-submit-button'
              onClick={this.handleButtonClick}
              type='submit'
            >
              {'Continue'}
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default createModal(Welcome, {
  hideCloseButton: true,
  isOpen: true,
  maxWidth: 3
})
