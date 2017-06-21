// @flow

import React, {Component} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import PropTypes from 'prop-types'
import stripTags from 'striptags'

import Ad from '../components/ad'
import createPage from '../helpers/create-page'
import insertUnits from '../helpers/in-content-units'
import {getUrlObj, getFeaturedImageProps} from '../helpers/post-data'
import Related from '../components/sidebar/related'
import Share from '../components/share'
import Suggest from '../components/sidebar/suggest'
import styles from '../styles/pages/post.scss'

class Post extends Component {
  static contextTypes = {
    headerStore: PropTypes.object
  }

  static displayName = 'Post'

  static getPostData = ({postsData, revisionsData}) => {
    let postData = Array.isArray(postsData) ? postsData[0] : postsData

    if (revisionsData) {
      postData = Object.assign(postData, revisionsData[0])
    }

    return postData
  }

  componentDidMount () {
    this.updateHeaderStore()
  }

  componentDidUpdate () {
    this.updateHeaderStore()
  }

  updateHeaderStore () {
    if (this.props.url.query.type === 'posts') {
      this.context.headerStore.enableScrollHeader({
        scrollTitle: Post.getPostData(this.props).title.rendered
      })
    } else {
      this.context.headerStore.disableScrollHeader()
    }
  }

  render () {
    const postData = Post.getPostData(this.props)

    const ogImageData: ?Object = getFeaturedImageProps(postData, {
      sizes: ['large', 'medium_large'],
      returnLargestSizeData: true
    })

    const featuredImageProps = getFeaturedImageProps(postData, {sizes: ['large', 'medium_large']})

    return (
      <main>
        <Head>
          <title>{postData.og_title || postData.title.rendered}</title>

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

        {featuredImageProps ? (
          <div className='mb2 sm-mb3'>
            <img
              className='col-12 block'
              {...featuredImageProps}
            />
          </div>
        ) : null}

        <div className={`max-width-${postData._formatting && postData._formatting.no_sidebar ? '3' : '4'} mx-auto`}>
          <div className={!postData._formatting || !postData._formatting.full_width ? 'page-x-spacing' : ''}>
            <div className='flex mb2'>
              <div className='col-12 md-flex-auto'>
                {!postData._formatting || !postData._formatting.hide_title ? (
                  <h1 className='mb2 md-h0'>
                    <Link
                      as={postData.link}
                      href={getUrlObj(postData)}
                    >
                      <a>{postData.title.rendered}</a>
                    </Link>
                  </h1>
                ) : null}

                {this.props.url.query.type !== 'pages' ? (
                  <div
                    className='mb2 gray italic'
                    dangerouslySetInnerHTML={{__html: stripTags(postData.excerpt.rendered)}}
                  />
                ) : null}

                {this.props.url.query.type !== 'pages' ? (
                  <div className='mb2 gray'>{moment(postData.date).format('MMMM D, YYYY')}</div>
                ) : null}

                {this.props.url.query.type !== 'pages' ? (
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
                  dangerouslySetInnerHTML={{__html: insertUnits(postData.content.rendered, {
                    skip: postData._formatting && postData._formatting.no_incontent_units
                  })}}
                  style={{fontSize: '1.125rem', lineHeight: '1.8'}}
                />

                {this.props.url.query.type !== 'pages' ? (
                  <Share
                    hackerNewsUrl={postData._social_links.hacker_news}
                    position='Below Content'
                    redditUrl={postData._social_links.reddit}
                    title={postData.title.rendered}
                    url={postData.link}
                  />
                ) : null}
              </div>

              {!postData._formatting || !postData._formatting.no_sidebar ? (
                <div
                  className='xs-hide sm-hide ml3'
                  style={{flex: '0 0 300px'}}
                >
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

              ) : null}
            </div>

            <hr className='my3' />
          </div>
        </div>
      </main>
    )
  }
}

export default createPage(Post, {
  propPaths: ({asPath, query: {p, page_id, preview, preview_id, type, slug}}) => {
    const paths: Object = {
      postsData: {
        authorize: !!preview,
        path: (p || page_id) ? `/wp/v2/${type}/${p || page_id}/?_embed` : `/wp/v2/${type}?_embed&slug=${slug}`
      }
    }

    if (preview) {
      paths.revisionsData = {
        authorize: true,
        path: `/wp/v2/${type}/${p || page_id || preview_id}/revisions`
      }
    }

    return paths
  }
})
