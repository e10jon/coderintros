// @flow

import React from 'react'

import Post from '../components/post'
import createPage from '../helpers/create-page'
import {didFailPasswordAuthorization} from '../helpers/post-data'

const extractPostData = ({postsData, revisionsData}: Object) => Object.assign({},
  Array.isArray(postsData) ? postsData[0] : postsData,
  revisionsData ? revisionsData[0] : {}
)

export const Singular = (props: Object) => {
  const postData = extractPostData(props)

  if (!Object.keys(postData).length || didFailPasswordAuthorization(postData)) {
    return (
      <div>
        <hr />
        <h2 className='center my3'>{"We couldn't find that page."}</h2>
        <hr />
      </div>
    )
  }

  return (
    <Post
      key={`Post${postData.id}`}
      postData={postData}
    />
  )
}

Singular.displayName = 'Singular'

export default createPage(Singular, {
  autoOpenFacebookModal: ({url: {query: {type}}}) => type === 'post',
  fullWidth: true,
  maxWidth: 3,
  propPaths: ({asPath, query: {p, password, page_id, preview, preview_id, type, slug}}) => ({
    postsData: {
      authorize: !!preview,
      path: (p || page_id) ? `/wp/v2/${type}s/${p || page_id}/?_embed` : `/wp/v2/${type}s?_embed&slug=${slug}&password=${password}`
    },
    revisionsData: preview ? {
      authorize: true,
      path: `/wp/v2/${type}s/${p || page_id || preview_id}/revisions`
    } : null
  })
})
