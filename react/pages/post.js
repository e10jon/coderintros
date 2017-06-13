// @flow

import React from 'react'
import Head from 'next/head'
import moment from 'moment'
import stripTags from 'striptags'

import createPage from '../helpers/create-page'
import {featuredImage, ogImage} from '../helpers/post-data'
import Link from '../helpers/link'
import Share from '../components/share'

const Post = ({postsData, url: {query: {type}}}) => {
  const postData = Array.isArray(postsData) ? postsData[0] : postsData

  return (
    <div>
      <Head>
        <title>{postData.title.rendered}</title>

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
        <meta
          content={ogImage(postData)}
          property='og:image'
        />
      </Head>

      <div className='my2 sm-my3'>
        {featuredImage(postData, {size: 'large'})}
      </div>

      {!postData._formatting || !postData._formatting.hide_title ? (
        <h1 className='my2'>
          <Link href={postData.link}>{postData.title.rendered}</Link>
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
  )
}

Post.displayName = 'Post'

export default createPage(Post, {
  propPaths: ({asPath, query: {p, preview, preview_id, preview_nonce, type, slug}}) => {
    let path

    if (preview) {
      path = `/wp/v2/${type}/${p || preview_id}/revisions?preview_nonce=${preview_nonce}`
    } else {
      path = `/wp/v2/${type}?_embed&slug=${slug}`
    }

    return {
      postsData: path
    }
  }
})
