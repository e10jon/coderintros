// @flow

import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import Head from 'next/head'
import Link from 'next/link'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'
import moment from 'moment'
import stripTags from 'striptags'

import Ad from '../components/ad'
import Response from '../components/response'
import insertUnits from '../helpers/in-content-units'
import {getUrlObj, getFeaturedImageProps} from '../helpers/post-data'
import Related from '../components/sidebar/related'
import Share from '../components/share'
import Suggest from '../components/sidebar/suggest'
import styles from '../styles/pages/post.scss'

@observer
class Post extends Component {
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
      _social_links: {}
    }
  }

  static displayName = 'Post'

  componentDidMount () {
    this.updateHeaderStore()

    window.handleGRecaptcha = (gRecaptchaResponse: string) => {
      this.context.postStore.handleSubmit(null, {gRecaptchaResponse})
    }
  }

  shouldComponentUpdate = () => true

  componentDidUpdate () {
    this.updateHeaderStore()
  }

  props: {
    postData: Object
  }

  updateHeaderStore () {
    const postData = this.context.postStore ? this.context.postStore.post : this.props.postData

    if (postData.type === 'post') {
      this.context.headerStore.enableScrollHeader({
        scrollTitle: postData.title.rendered
      })
    } else {
      this.context.headerStore.disableScrollHeader()
    }
  }

  render () {
    const postData = this.context.postStore ? this.context.postStore.post : this.props.postData

    const ogImageData: ?Object = getFeaturedImageProps(postData, {
      sizes: ['large', 'medium_large'],
      returnLargestSizeData: true
    })

    const featuredImg = (
      <img
        className='col-12 block'
        {...getFeaturedImageProps(postData, {sizes: ['large', 'medium_large']})}
      />
    )

    return (
      <div>
        <Head>
          {postData.og_title || postData.title.rendered ? (
            <title>{postData.og_title || postData.title.rendered}</title>
          ) : null}

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
            content={postData.og_title}
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
        </Head>

        {!postData._formatting.hide_featured_image ? (
          <div className='mb2 sm-mb3 lg-page-x-spacing'>
            {this.context.postStore ? (
              <Dropzone
                className='col-12'
                onDrop={this.context.postStore.handleFeaturedImageDrop}
              >
                {featuredImg.props.src ? featuredImg : (
                  <div
                    className='bg-silver flex items-center justify-center'
                    style={{height: '600px'}}
                  >
                    {this.context.postStore.isFeaturedImageUploading ? 'Uploading...' : 'Drop an image here.'}
                  </div>
                )}
              </Dropzone>
            ) : featuredImg}
          </div>
        ) : null}

        <div className='flex mb2'>
          <div className='col-12 md-flex-auto'>
            <div className={!postData._formatting.full_width ? 'page-x-spacing' : ''}>
              {!postData._formatting.hide_title ? (
                <h1 className='mb2 md-h0'>
                  {this.context.postStore ? (
                    <div
                      contentEditable
                      dangerouslySetInnerHTML={{__html: postData.title.rendered}}
                      onBlur={this.context.postStore.handleTitleChange}
                      placeholder='Your Name'
                    />
                  ) : (
                    <Link
                      as={postData.link}
                      href={getUrlObj(postData)}
                    >
                      <a>{postData.title.rendered}</a>
                    </Link>
                  )}
                </h1>
              ) : null}

              {postData.type !== 'page' ? (
                <div
                  className='mb2 gray italic'
                  contentEditable={!!this.context.postStore}
                  dangerouslySetInnerHTML={{__html: stripTags(postData.excerpt.rendered)}}
                  onBlur={this.context.postStore ? this.context.postStore.handleExcerptChange : null}
                  placeholder='Your brief bio'
                />
              ) : null}

              {postData.type !== 'page' ? (
                <div className='mb2 gray'>
                  {postData.date ? (
                    <div>{moment(postData.date).format('MMMM D, YYYY')}</div>
                  ) : (
                    <div>{'Coming soon`'}</div>
                  )}
                </div>
              ) : null}

              {postData.type !== 'page' && !this.context.postStore ? (
                <Share
                  hackerNewsUrl={postData._social_links.hacker_news}
                  position='Above Content'
                  redditUrl={postData._social_links.reddit}
                  title={postData.title.rendered}
                  url={postData.link}
                />
              ) : null}

              <div
                className='mb3 serif post-content'
                style={{fontSize: '1.125rem', lineHeight: '1.8'}}
              >
                {this.context.postStore ? (
                  postData.responses.map((response, i) => (
                    <Response
                      index={i}
                      key={`Response${response.id}`}
                      response={response}
                    />
                  ))
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

              {postData.type !== 'page' && !this.context.postStore ? (
                <Share
                  hackerNewsUrl={postData._social_links.hacker_news}
                  position='Below Content'
                  redditUrl={postData._social_links.reddit}
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
                        data-sitekey={process.env.G_RECAPTCHA_SITEKEY}
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

          {!postData._formatting.no_sidebar ? (
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
          ) : null}
        </div>
      </div>
    )
  }
}

export default Post
