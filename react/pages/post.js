// @flow

import React from 'react'

import createPage from '../components/page'
import Link from '../helpers/link'

const Post = ({postsData}) => {
  const postData = Array.isArray(postsData) ? postsData[0] : postsData

  return (
    <div>
      <Link href={postData.link}>
        <h1>{postData.title.rendered}</h1>
        {postData._embedded && postData._embedded['wp:featuredmedia'] ? (
          <img
            alt={postData._embedded['wp:featuredmedia'][0].alt_text}
            className='fit'
            src={postData._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url}
          />
        ) : null}
        <div dangerouslySetInnerHTML={{__html: postData.content.rendered}} />
      </Link>
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
