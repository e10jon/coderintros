// @flow

/* global G_RECAPTCHA_ENABLED */
/* global G_RECAPTCHA_SITEKEY */

import React, {PureComponent} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'
import moment from 'moment'
import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import {IoPlus as AddResponseIcon} from 'react-icons/lib/io'
import {CSSTransitionGroup} from 'react-transition-group'
import stripTags from 'striptags'

import insertUnits from '../helpers/in-content-units'
import {getUrlObj, getFeaturedImageProps} from '../helpers/post-data'
import ContentEditable from './content-editable'
import Related from './related'
import Response from './response'
import Share from './share'
import {minResponsesRequired} from '../stores/post'
import SubmissionStatusItem from './submission-status-item'

@observer
class Post extends PureComponent {
  static contextTypes = {
    headerStore: MobxReactPropTypes.observableObject,
    postStore: MobxReactPropTypes.observableObject,
    siteData: PropTypes.object
  }

  static defaultProps = {
    postData: {
      content: {},
      excerpt: {},
      title: {},
      _formatting: {},
      _social: {}
    }
  }

  static displayName = 'Post'

  componentWillMount () {
    this.updateHeaderStore()
  }

  componentDidMount () {
    this.defineGlobalRecaptchaCallbackFunction()
  }

  context: {
    headerStore: Object,
    postStore?: Object
  }
  props: {
    postData: Object
  }

  defineGlobalRecaptchaCallbackFunction () {
    window.handleGRecaptcha = (gRecaptchaResponse: string) => {
      if (this.context.postStore) {
        this.context.postStore.handleSubmit(null, {gRecaptchaResponse})
      }
    }
  }

  handleAddResponse = this.context.postStore && this.context.postStore.handleAddResponse.bind(null, null)

  updateHeaderStore () {
    if (this.props.postData.type === 'post' && !this.context.postStore) {
      this.context.headerStore.enableScrollHeader({
        scrollTitle: this.props.postData.name
      })
    } else {
      this.context.headerStore.disableScrollHeader()
    }
  }

  render () {
    const postData = this.context.postStore ? this.context.postStore.post : this.props.postData

    const ogImageData: ?Object = getFeaturedImageProps(postData, {
      returnLargestSizeData: true
    })

    const strippedExcerpt = stripTags(postData.excerpt.rendered)

    const featuredImg = (
      <img
        className='col-12 block'
        {...getFeaturedImageProps(postData)}
      />
    )

    const renderDropzone = () => {
      if (!this.context.postStore) {
        return null
      }

      if (this.context.postStore.isFeaturedImageUploading || this.context.postStore.didFeaturedImageUploadError || !featuredImg.props.src) {
        let message

        if (this.context.postStore.isFeaturedImageUploading) {
          message = 'Uploading...'
        } else if (this.context.postStore.didFeaturedImageUploadError) {
          message = 'There was an error. Please try a different photo.'
        } else {
          message = 'Drag a high-res photo of yourself or click here'
        }

        return (
          <div
            className='border border-gray bg-darken-0 gray flex items-center justify-center pointer'
            style={{height: '400px'}}
          >
            {message}
          </div>
        )
      } else {
        return featuredImg
      }
    }

    const isSubmitButtonDisabled = this.context.postStore &&
      (!this.context.postStore.isValid ||
      this.context.postStore.isSubmitting ||
      this.context.postStore.didSubmit)

    return (
      <div>
        <Head>
          <title>{postData.title.rendered || ''}</title>

          <meta
            content={strippedExcerpt}
            name='description'
          />

          <meta
            content='article'
            property='og:type'
          />
          <meta
            content={postData.link}
            property='og:url'
          />
          <meta
            content={postData.title.rendered}
            property='og:title'
          />
          <meta
            content={strippedExcerpt}
            property='og:description'
          />
          {ogImageData && (
            <meta
              content={ogImageData.source_url}
              property='og:image'
            />
          )}
          {ogImageData && (
            <meta
              content={ogImageData.height}
              property='og:image:height'
            />
          )}
          {ogImageData && (
            <meta
              content={ogImageData.width}
              property='og:image:width'
            />
          )}

          {this.context.postStore && (
            <script
              async
              defer
              src='https://www.google.com/recaptcha/api.js'
            />
          )}
        </Head>

        {!postData._formatting.hide_featured_image && (
          <div className='mb2 sm-mb3 md-page-x-spacing'>
            {this.context.postStore ? (
              <Dropzone
                className='col-12'
                onDrop={this.context.postStore && this.context.postStore.handleFeaturedImageDrop}
              >
                {renderDropzone()}
              </Dropzone>
            ) : featuredImg}
          </div>
        )}

        <div className='flex flex-wrap mb2'>
          <div className='col-12 md-flex-auto'>
            <div className={!postData._formatting.full_width ? 'page-x-spacing' : ''}>
              {!postData._formatting.hide_title && (
                <h1 className='mb1 sm-h0'>
                  {this.context.postStore ? (
                    <ContentEditable
                      dangerouslySetInnerHTML={{__html: postData.name}}
                      onBlur={this.context.postStore.handleNameChange}
                      placeholder='Your Name'
                    />
                  ) : (
                    <Link
                      as={postData.link}
                      href={getUrlObj(postData)}
                    >
                      <a>{postData.name || postData.title.rendered}</a>
                    </Link>
                  )}
                </h1>
              )}

              {postData.type !== 'page' && (
                <div className='mb2 gray h3 sm-col-10'>
                  {this.context.postStore ? (
                    <ContentEditable
                      dangerouslySetInnerHTML={{__html: strippedExcerpt}}
                      onBlur={this.context.postStore && this.context.postStore.handleExcerptChange}
                      placeholder='Your brief bio'
                    />
                  ) : (
                    <div dangerouslySetInnerHTML={{__html: strippedExcerpt}} />
                  )}
                </div>
              )}

              {postData.type !== 'page' && (
                <div className='mb2 gray h5 ups'>{moment(postData.date).format('MMMM D, YYYY')}</div>
              )}

              {postData.type !== 'page' && (
                this.context.postStore ? <hr className='my3 col-6 ml0' /> : (
                  <Share
                    description={strippedExcerpt}
                    hackerNewsUrl={postData._social.hacker_news_url}
                    position='Above Content'
                    redditUrl={postData._social.reddit_url}
                    title={postData.title.rendered}
                    url={postData.link}
                  />
                )
              )}

              <div className='mb3 serif post-content'>
                {this.context.postStore ? (
                  <div>
                    <CSSTransitionGroup
                      className='responses'
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={300}
                      transitionName='response'
                    >
                      {postData.responses.map((response, i) => (
                        <Response
                          index={i}
                          key={`Response${response.id}`}
                          response={response}
                        />
                      ))}
                    </CSSTransitionGroup>

                    <div className='my3'>
                      <a
                        className='inline-block p1 h5 border sans-serif'
                        href='javascript:void(0)'
                        onClick={this.handleAddResponse}
                      >
                        <AddResponseIcon />
                        <span className='align-middle pl1'>{!postData.responses.length ? 'Add your first Q&A' : 'Add another Q&A'}</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: !postData._formatting.no_incontent_units
                        ? insertUnits(postData.content.rendered, {context: this.context})
                        : postData.content.rendered
                    }}
                  />
                )}
              </div>

              {postData.type !== 'page' && !this.context.postStore && (
                <Share
                  description={strippedExcerpt}
                  hackerNewsUrl={postData._social.hacker_news_url}
                  position='Below Content'
                  redditUrl={postData._social.reddit_url}
                  title={postData.title.rendered}
                  url={postData.link}
                />
              )}

              {this.context.postStore && (
                <div className='mt4 bg-darken-0 p3'>
                  <div className='mb3 h3 gray'>{'Validate and submit'}</div>

                  <SubmissionStatusItem isValid={this.context.postStore.isPhotoValid}>
                    {'Upload a photo'}
                  </SubmissionStatusItem>

                  <SubmissionStatusItem isValid={this.context.postStore.isNameValid}>
                    {'Enter your name'}
                  </SubmissionStatusItem>

                  <SubmissionStatusItem isValid={this.context.postStore.isExcerptValid}>
                    {'Enter your bio'}
                  </SubmissionStatusItem>

                  <SubmissionStatusItem isValid={this.context.postStore.isResponsesLengthValid}>
                    {`Answer at least ${minResponsesRequired} questions`}
                  </SubmissionStatusItem>

                  <SubmissionStatusItem isValid={this.context.postStore.isJobTitleValid}>
                    <div className='mb1'>
                      <span>{'Enter your job title:'}</span>
                    </div>

                    <input
                      className='input mb1'
                      onChange={this.context.postStore.handleJobTitleChange}
                      placeholder='Senior Developer'
                      required
                      type='text'
                      value={postData.job_title}
                    />
                  </SubmissionStatusItem>

                  <SubmissionStatusItem isValid={null}>
                    <div className='mb1'>
                      <span>{'Enter your current employer: '}</span>
                      <span className='h5'>{'(optional)'}</span>
                    </div>

                    <input
                      className='input mb1'
                      onChange={this.context.postStore.handleEmployerChange}
                      placeholder='Initech, Inc.'
                      type='text'
                      value={postData.employer}
                    />
                  </SubmissionStatusItem>

                  <SubmissionStatusItem isValid={this.context.postStore.isCurrentLocationValid}>
                    <div className='mb1'>
                      <span>{'Enter your current location:'}</span>
                    </div>

                    <input
                      className='input mb1'
                      onChange={this.context.postStore.handleCurrentLocationChange}
                      placeholder='Coderville, CA'
                      required
                      type='text'
                      value={postData.current_location}
                    />
                  </SubmissionStatusItem>

                  <SubmissionStatusItem isValid={null}>
                    <div className='mb1'>
                      <span>{'Enter your hometown: '}</span>
                      <span className='h5'>{'(optional)'}</span>
                    </div>

                    <input
                      className='input mb1'
                      onChange={this.context.postStore.handleHometownLocationChange}
                      placeholder='Smalltown, TX'
                      type='text'
                      value={postData.hometown_location}
                    />
                  </SubmissionStatusItem>

                  <SubmissionStatusItem isValid={this.context.postStore.isEmailValid}>
                    <div className='mb1'>
                      <span>{'Enter your email: '}</span>
                      <span className='h5'>{'(will not be published)'}</span>
                    </div>

                    <input
                      className='input mb1'
                      onChange={this.context.postStore.handleEmailChange}
                      placeholder='you@domain.com'
                      required
                      type='email'
                      value={postData.email}
                    />
                  </SubmissionStatusItem>

                  <SubmissionStatusItem isValid={null}>
                    <div className='mb1'>
                      <span>{'Enter your phone number: '}</span>
                      <span className='h5'>{'(optional, will not be published)'}</span>
                    </div>

                    <input
                      className='input mb0'
                      onChange={this.context.postStore.handlePhoneChange}
                      placeholder='555-123-1234'
                      type='tel'
                      value={postData.phone}
                    />
                  </SubmissionStatusItem>

                  <SubmissionStatusItem isValid={null}>
                    <div className='flex items-center mt3'>
                      <button
                        className={`btn btn-big h3 ${G_RECAPTCHA_ENABLED !== 'false' ? 'g-recaptcha' : ''} ${isSubmitButtonDisabled ? 'muted silver bg-gray' : 'btn-primary'}`}
                        data-callback={G_RECAPTCHA_ENABLED !== 'false' && 'handleGRecaptcha'}
                        data-sitekey={G_RECAPTCHA_ENABLED !== 'false' && G_RECAPTCHA_SITEKEY}
                        disabled={isSubmitButtonDisabled}
                        onClick={G_RECAPTCHA_ENABLED === 'false' && this.context.postStore.handleSubmit}
                        type='submit'
                      >
                        {'Submit'}
                      </button>

                      <div className='ml2'>
                        {this.context.postStore.isSubmitting && <span className='gray'>{'Please wait...'}</span>}
                        {this.context.postStore.didError && <span className='red'>{`Sorry, but there was an error: ${this.context.postStore.errorMessage}`}</span>}
                      </div>
                    </div>
                  </SubmissionStatusItem>
                </div>
              )}
            </div>
          </div>

          {postData.type === 'post' && !this.context.postStore && (
            <div className='col-12'>
              <div className={!postData._formatting.full_width ? 'page-x-spacing' : ''}>
                <Related postData={postData} />
              </div>
            </div>
          )}

          <div className='col-12'>
            <div className={!postData._formatting.full_width ? 'page-x-spacing' : ''}>
              <hr />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Post
