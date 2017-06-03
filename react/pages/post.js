// @flow

import React from 'react'

import createPage from '../components/page'
import Link from '../helpers/link'

const Post = ({postsData}) => {
  const postData = postsData[0]

  return (
    <div>
      <Link href={postData.link}>
        <h1>{postData.title.rendered}</h1>
      </Link>
    </div>
  )
}

Post.displayName = 'Post'

export default createPage(Post, {
  propPaths: ({asPath}) => ({
    postsData: `/posts?slug=${asPath.match(/\/\d{4}\/\d{2}\/(.+?)(\/|$)/)[1]}`
  })
})
