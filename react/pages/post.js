// @flow

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import stripTags from 'striptags'

import Ad from '../components/ad'
import createPage from '../helpers/create-page'
import insertUnits from '../helpers/in-content-units'
import {getUrlObj, getFeaturedImageProps} from '../helpers/post-data'
import Related from '../components/sidebar/related'
import Share from '../components/share'
import Suggest from '../components/sidebar/suggest'
import styles from '../styles/pages/post.scss'

const Post = ({postsData, revisionsData, url: {query: {type}}}) => {
  let postData = Array.isArray(postsData) ? postsData[0] : postsData

  if (revisionsData) {
    postData = Object.assign(postData, revisionsData[0])
  }

  const ogImageData: ?Object = getFeaturedImageProps(postData, {
    sizes: ['large', 'medium_large'],
    returnLargestSizeData: true
  })

  const xSpacingClassName = !postData._formatting || !postData._formatting.full_width ? 'page-x-spacing' : ''

  const maxWidth = postData._formatting && postData._formatting.no_sidebar ? '3' : '4'

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

      <div className='my2 sm-my3'>
        <img
          className='block fit bg-gray'
          {...getFeaturedImageProps(postData, {sizes: ['large', 'medium_large']})}
        />
      </div>

      <div className={`max-width-${maxWidth} mx-auto`}>
        <div className={`flex my2 ${xSpacingClassName}`}>
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

            {type !== 'pages' ? (
              <div
                className='my2 gray italic'
                dangerouslySetInnerHTML={{__html: stripTags(postData.excerpt.rendered)}}
              />
            ) : null}

            {type !== 'pages' ? (
              <div className='my2 gray'>{moment(postData.date).format('MMMM D, YYYY')}</div>
            ) : null}

            {type !== 'pages' ? (
              <Share
                hackerNewsUrl={postData._social_links.hacker_news}
                position='Above Content'
                redditUrl={postData._social_links.reddit}
                title={postData.title.rendered}
                url={postData.link}
              />
            ) : null}

            <div
              className='my3 serif post-content'
              dangerouslySetInnerHTML={{__html: insertUnits(postData.content.rendered, {
                skip: postData._formatting && postData._formatting.no_incontent_units
              })}}
              style={{fontSize: '1.125rem', lineHeight: '1.8'}}
            />

            {type !== 'pages' ? (
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

              <Suggest className='my3' />

              <Ad
                className='my3'
                height={250}
                width={300}
              />

              <Related />
            </div>

          ) : null}
        </div>

        <hr className='mt3 mb3 sm-mt4' />

      </div>
    </main>
  )
}

Post.displayName = 'Post'

export default createPage(Post, {
  propPaths: ({asPath, query: {p, preview, preview_id, type, slug}}) => {
    const paths: Object = {
      postsData: p ? `/wp/v2/${type}/${p}/?_embed` : `/wp/v2/${type}?_embed&slug=${slug}`
    }

    if (preview) {
      paths.revisionsData = {
        authorize: true,
        path: `/wp/v2/${type}/${p || preview_id}/revisions`
      }
    }

    return paths
  }
})
