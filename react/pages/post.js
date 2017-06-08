// @flow

import React from 'react'
import Head from 'next/head'
import moment from 'moment'

import createPage from '../components/page'
import {featuredImage} from '../helpers/post-data'
import Link from '../helpers/link'

const Post = ({postsData}) => {
  const postData = Array.isArray(postsData) ? postsData[0] : postsData

  return (
    <div>
      <Head>
        <title>{postData.title.rendered}</title>
        <meta
          content={postData.excerpt.rendered}
          name='description'
        />
      </Head>

      <div className='my3'>
        {featuredImage(postData, {size: 'large'})}
      </div>

      <Link href={postData.link}>
        <h1>{postData.title.rendered}</h1>
      </Link>

      <div className='my2 h5 gray'>{moment(postData.date).format('MMMM D, YYYY')}</div>

      <div
        className='my3'
        dangerouslySetInnerHTML={{__html: postData.content.rendered}}
      />
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
