// @flow

/* global G_RECAPTCHA_ENABLED */
/* global G_RECAPTCHA_SITEKEY */

import React from 'react'
import classNames from 'classnames'
import {PropTypes as MobxReactPropTypes} from 'mobx-react'

import {minResponsesRequired} from '../stores/post'
import SubmissionStatusItem from '../components/submission-status-item'

const SubmissionStatus = ({className, postData}: {className: string, postData: Object}, {postStore}: {postStore: Object}) => {
  const isSubmitButtonDisabled = !postStore.isValid || postStore.isSubmitting || postStore.didSubmit

  return (
    <div className={classNames(className)}>
      <div className='mb2 h3 gray'>{'Interview validation'}</div>

      <SubmissionStatusItem isValid={postStore.isPhotoValid}>
        {'Upload a photo'}
      </SubmissionStatusItem>

      <SubmissionStatusItem isValid={postStore.isNameValid}>
        {'Enter your name'}
      </SubmissionStatusItem>

      <SubmissionStatusItem isValid={postStore.isExcerptValid}>
        {'Enter your bio'}
      </SubmissionStatusItem>

      <SubmissionStatusItem isValid={postStore.isResponsesLengthValid}>
        {`Answer at least ${minResponsesRequired} questions`}
      </SubmissionStatusItem>

      <hr className='my3 border-silver' />

      <div className='mb2 h3 gray'>{'Enter additional information'}</div>

      <div className='flex flex-wrap'>
        <div className='col-6'>
          <SubmissionStatusItem isValid={postStore.isJobTitleValid}>
            <div className='mb1'>
              <span>{'Job title'}</span>
            </div>

            <input
              className='input mb1'
              onChange={postStore.handleJobTitleChange}
              placeholder='Senior Developer'
              required
              type='text'
              value={postData.job_title}
            />
          </SubmissionStatusItem>
        </div>

        <div className='col-6'>
          <SubmissionStatusItem isValid={null}>
            <div className='mb1'>
              <span>{'Current employer'}</span>
              <span className='pl1 h5'>{'(optional)'}</span>
            </div>

            <input
              className='input mb1'
              onChange={postStore.handleEmployerChange}
              placeholder='Initech, Inc.'
              type='text'
              value={postData.employer}
            />
          </SubmissionStatusItem>
        </div>

        <div className='col-6'>
          <SubmissionStatusItem isValid={postStore.isCurrentLocationValid}>
            <div className='mb1'>
              <span>{'Current area of residence'}</span>
            </div>

            <input
              className='input mb1'
              onChange={postStore.handleCurrentLocationChange}
              placeholder='Coderville, CA'
              required
              type='text'
              value={postData.current_location}
            />
          </SubmissionStatusItem>
        </div>

        <div className='col-6'>
          <SubmissionStatusItem isValid={null}>
            <div className='mb1'>
              <span>{'Hometown'}</span>
              <span className='pl1 h5'>{'(optional)'}</span>
            </div>

            <input
              className='input mb1'
              onChange={postStore.handleHometownLocationChange}
              placeholder='Smalltown, TX'
              type='text'
              value={postData.hometown_location}
            />
          </SubmissionStatusItem>
        </div>
      </div>

      <hr className='my3 border-silver' />

      <div className='mb2 h3 gray'>
        <span>{'Enter URLs'}</span>
        <span className='pl1 h4'>{'(optional)'}</span>
      </div>

      <div className='flex flex-wrap'>
        <div className='col-6'>
          <SubmissionStatusItem isValid={null}>
            <div className='mb1'>
              <span>{'Facebook URL'}</span>
            </div>

            <input
              className='input mb0 h5'
              onChange={postStore.handleFacebookUrlChange}
              placeholder='https://www.facebook.com/yourname'
              type='text'
              value={postData.facebook_url}
            />
          </SubmissionStatusItem>
        </div>

        <div className='col-6'>
          <SubmissionStatusItem isValid={null}>
            <div className='mb1'>
              <span>{'Twitter URL'}</span>
            </div>

            <input
              className='input mb0 h5'
              onChange={postStore.handleTwitterUrlChange}
              placeholder='https://twitter.com/yourname'
              type='text'
              value={postData.twitter_url}
            />
          </SubmissionStatusItem>
        </div>

        <div className='col-6'>
          <SubmissionStatusItem isValid={null}>
            <div className='mb1'>
              <span>{'LinkedIn URL'}</span>
            </div>

            <input
              className='input mb0 h5'
              onChange={postStore.handleLinkedInUrlChange}
              placeholder='https://www.linkedin.com/in/yourname/'
              type='text'
              value={postData.linkedin_url}
            />
          </SubmissionStatusItem>
        </div>

        <div className='col-6'>
          <SubmissionStatusItem isValid={null}>
            <div className='mb1'>
              <span>{'Personal URL'}</span>
            </div>

            <input
              className='input mb0 h5'
              onChange={postStore.handlePersonalUrlChange}
              placeholder='http://www.yoursite.com'
              type='text'
              value={postData.personal_url}
            />
          </SubmissionStatusItem>
        </div>
      </div>

      <hr className='my3 border-silver' />

      <div className='mb2 h3 gray'>
        <span>{'Enter contact information'}</span>
        <span className='pl1 h4'>{'(will not be published)'}</span>
      </div>

      <div className='flex flex-wrap'>
        <div className='col-6'>
          <SubmissionStatusItem isValid={postStore.isEmailValid}>
            <div className='mb1'>
              <span>{'Email'}</span>
            </div>

            <input
              className='input mb1'
              onChange={postStore.handleEmailChange}
              placeholder='you@domain.com'
              required
              type='email'
              value={postData.email}
            />
          </SubmissionStatusItem>
        </div>

        <div className='col-6'>
          <SubmissionStatusItem isValid={null}>
            <div className='mb1'>
              <span>{'Phone'}</span>
              <span className='pl1 h5'>{'(optional)'}</span>
            </div>

            <input
              className='input mb0'
              onChange={postStore.handlePhoneChange}
              placeholder='555-123-1234'
              type='tel'
              value={postData.phone}
            />
          </SubmissionStatusItem>
        </div>
      </div>

      <hr className='my3 border-silver' />

      <SubmissionStatusItem isValid={null}>
        <div className='flex items-center'>
          <button
            className={`btn btn-big h3 ${G_RECAPTCHA_ENABLED !== 'false' ? 'g-recaptcha' : ''} ${isSubmitButtonDisabled ? 'muted silver bg-gray' : 'btn-primary'}`}
            data-callback={G_RECAPTCHA_ENABLED !== 'false' && 'handleGRecaptcha'}
            data-sitekey={G_RECAPTCHA_ENABLED !== 'false' && G_RECAPTCHA_SITEKEY}
            disabled={isSubmitButtonDisabled}
            onClick={G_RECAPTCHA_ENABLED === 'false' && postStore.handleSubmit}
            type='submit'
          >
            {'Submit'}
          </button>

          <div className='ml2'>
            {postStore.isSubmitting && <span className='gray'>{'Please wait...'}</span>}
            {postStore.didError && <span className='red'>{`Sorry, but there was an error: ${postStore.errorMessage}`}</span>}
          </div>
        </div>
      </SubmissionStatusItem>
    </div>
  )
}

SubmissionStatus.contextTypes = {
  postStore: MobxReactPropTypes.observableObject
}

export default SubmissionStatus
