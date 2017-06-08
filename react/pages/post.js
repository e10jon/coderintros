// @flow

import React from 'react'
import moment from 'moment'

import createPage from '../components/page'
import Link from '../helpers/link'

const Post = ({postsData}) => {
  const postData = Array.isArray(postsData) ? postsData[0] : postsData

  return (
    <div>
      <img
        alt={postData._embedded && postData._embedded['wp:featuredmedia'] ? postData._embedded['wp:featuredmedia'][0].alt_text : ''}
        className='block fit my3 bg-gray'
        src={postData._embedded && postData._embedded['wp:featuredmedia'] ? postData._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url : '/static/img/default.svg'}
      />

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
  propPaths: ({asPath, query: {p, preview, preview_id, preview_nonce}}) => {
    let path

    if (preview) {
      path = `/wp/v2/posts/${p || preview_id}/revisions?preview_nonce=${preview_nonce}`
    } else {
      path = `/wp/v2/posts?_embed&slug=${asPath.match(/\/\d{4}\/\d{2}\/(.+?)(\/|$)/)[1]}`
    }

    return {
      postsData: path
    }
  }
})
