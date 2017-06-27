// @flow

/* global G_RECAPTCHA_SITEKEY */

import React, {PureComponent} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'
import moment from 'moment'
import Head from 'next/head'
import Link from 'next/link'
import Dropzone from 'react-dropzone'
import {IoCompose as AddResponseIcon} from 'react-icons/lib/io'
import stripTags from 'striptags'

import insertUnits from '../helpers/in-content-units'
import {getUrlObj, getFeaturedImageProps} from '../helpers/post-data'
import Related from '../components/related'
import Response from '../components/response'
import Share from '../components/share'
import styles from '../styles/pages/post.scss'

@observer
class Post extends PureComponent {
  static contextTypes = {
    postStore: MobxReactPropTypes.observableObject,
    headerStore: MobxReactPropTypes.observableObject
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

  props: {
    postData: Object
  }

  defineGlobalRecaptchaCallbackFunction () {
    if (this.context.postStore) {
      window.handleGRecaptcha = (gRecaptchaResponse: string) => {
        this.context.postStore.handleSubmit(null, {gRecaptchaResponse})
      }
    }
  }

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

    const featuredImg = (
      <img
        className='col-12 block'
        {...getFeaturedImageProps(postData)}
      />
    )

    return (
      <div>
        <Head>
          <title>{postData.title.rendered || ''}</title>

          <style dangerouslySetInnerHTML={{__html: styles}} />

          <meta
            content={stripTags(postData.excerpt.rendered)}
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
            content={stripTags(postData.excerpt.rendered)}
            property='og:description'
          />
          {ogImageData ? (
            <meta
              content={ogImageData.source_url}
              property='og:image'
            />
          ) : null}
          {ogImageData ? (
            <meta
              content={ogImageData.height}
              property='og:image:height'
            />
          ) : null}
          {ogImageData ? (
            <meta
              content={ogImageData.width}
              property='og:image:width'
            />
          ) : null}

          {this.context.postStore ? (
            <script
              async
              defer
              src='https://www.google.com/recaptcha/api.js'
            />
          ) : null}
        </Head>

        {!postData._formatting.hide_featured_image ? (
          <div className='mb2 sm-mb3 md-page-x-spacing'>
            {this.context.postStore ? (
              <Dropzone
                className='col-12'
                onDrop={this.context.postStore.handleFeaturedImageDrop}
              >
                {featuredImg.props.src ? featuredImg : (
                  <div
                    className='bg-silver flex items-center justify-center'
                    style={{height: '400px'}}
                  >
                    {this.context.postStore.isFeaturedImageUploading ? 'Uploading...' : 'Drop an image here.'}
                  </div>
                )}
              </Dropzone>
            ) : featuredImg}
          </div>
        ) : null}

        <div className='flex flex-wrap mb2'>
          <div className='col-12 md-flex-auto'>
            <div className={!postData._formatting.full_width ? 'page-x-spacing' : ''}>
              {!postData._formatting.hide_title ? (
                <h1 className='mb2 md-h0'>
                  {this.context.postStore ? (
                    <div
                      contentEditable
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
              ) : null}

              {postData.type !== 'page' ? (
                <div
                  className='mb2 gray sm-col-10'
                  contentEditable={!!this.context.postStore}
                  dangerouslySetInnerHTML={{__html: stripTags(postData.excerpt.rendered)}}
                  onBlur={this.context.postStore ? this.context.postStore.handleExcerptChange : null}
                  placeholder='Your brief bio'
                />
              ) : null}

              {postData.type !== 'page' ? (
                <div className='mb2 gray'>{moment(postData.date).format('MMMM D, YYYY')}</div>
              ) : null}

              {postData.type !== 'page' ? (
                <Share
                  hackerNewsUrl={postData._social.hacker_news_url}
                  position='Above Content'
                  redditUrl={postData._social.reddit_url}
                  title={postData.title.rendered}
                  url={postData.link}
                />
              ) : null}

              <div
                className='mb3 serif post-content'
                style={{fontSize: '1.125rem', lineHeight: '1.8'}}
              >
                {this.context.postStore ? (
                  <div>
                    {postData.responses.map((response, i) => (
                      <Response
                        index={i}
                        key={`Response${response.id}`}
                        response={response}
                      />
                    ))}

                    {!postData.responses.length ? (
                      <div>
                        <a
                          className='inline-block px1 h5 border sans-serif'
                          href='javascript:void(0)'
                          onClick={this.context.postStore.handleAddResponse}
                        >
                          <AddResponseIcon />
                          <span className='align-middle pl1'>{'Add your first question'}</span>
                        </a>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: !postData._formatting.no_incontent_units
                        ? insertUnits(postData.content.rendered)
                        : postData.content.rendered
                    }}
                  />
                )}
              </div>

              {postData.type !== 'page' ? (
                <Share
                  hackerNewsUrl={postData._social.hacker_news_url}
                  position='Below Content'
                  redditUrl={postData._social.reddit_url}
                  title={postData.title.rendered}
                  url={postData.link}
                />
              ) : null}

              {this.context.postStore ? (
                <div>
                  {this.context.postStore.didSubmit ? 'Thank you!' : (
                    this.context.postStore.isSubmitting ? 'Submitting...' : (
                      <button
                        className='btn btn-primary g-recaptcha'
                        data-callback='handleGRecaptcha'
                        data-sitekey={G_RECAPTCHA_SITEKEY}
                        type='submit'
                      >
                        {'Submit'}
                      </button>
                    )
                  )}
                </div>
              ) : null}
            </div>
          </div>

          {/* !postData._formatting.no_sidebar ? (
            <div
              className='xs-hide sm-hide'
              style={{flex: '0 0 300px'}}
            >
              <div className={!postData._formatting.full_width ? 'page-x-spacing' : ''}>
                <Ad
                  className='mb3'
                  height={600}
                  width={300}
                />

                <Suggest className='mb3' />

                <Ad
                  className='mb3'
                  height={250}
                  width={300}
                />

                <Related />
              </div>
            </div>
          ) : null */}

          {postData.type === 'post' && !this.context.postStore ? (
            <div className='col-12'>
              <div className={!postData._formatting.full_width ? 'page-x-spacing' : ''}>
                <Related postData={postData} />
              </div>
            </div>
          ) : null}

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
