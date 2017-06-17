// @flow

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import stripTags from 'striptags'

import createPage, {pageXSpacing} from '../helpers/create-page'
import {getUrlObj, getFeaturedImageProps} from '../helpers/post-data'
import Share from '../components/share'

const Post = ({postsData, revisionsData, url: {query: {type}}}) => {
  let postData = Array.isArray(postsData) ? postsData[0] : postsData

  if (revisionsData) {
    postData = Object.assign(postData, revisionsData[0])
  }

  const ogImageData: ?Object = getFeaturedImageProps(postData, {
    sizes: ['large', 'medium_large'],
    returnLargestSizeData: true
  })

  const xSpacingClassName = !postData._formatting || !postData._formatting.full_width ? pageXSpacing : undefined

  return (
    <div>
      <Head>
        <title>{postData.og_title || postData.title.rendered}</title>

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

      <div className={xSpacingClassName}>
        {!postData._formatting || !postData._formatting.hide_title ? (
          <h1 className='my2'>
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
          dangerouslySetInnerHTML={{__html: postData.content.rendered}}
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
    </div>
  )
}

Post.displayName = 'Post'

export default createPage(Post, {
  propPaths: ({asPath, query: {p, preview, preview_id, type, slug}}) => {
    const paths: Object = {
      postsData: p ? `/wp/v2/${type}/${p}/?_embed` : `/wp/v2/${type}?_embed&slug=${slug}`
    }

    if (preview) {
      paths.revisionsData = `/wp/v2/${type}/${p || preview_id}/revisions`
    }

    return paths
  }
})
