// @flow

import React from 'react'

import Post from '../components/post'
import {Error} from '../pages/_error'
import createPage from '../helpers/create-page'
import {didFailPasswordAuthorization} from '../helpers/post-data'

export const Singular = ({postData, revisionsData}: Object) => {
  const postWithRevisionData = Object.assign({}, postData, revisionsData && revisionsData[0])

  let errorMessage

  if (!Object.keys(postWithRevisionData).length) {
    errorMessage = 'We couldn\'t find that page.'
  } else if (didFailPasswordAuthorization(postWithRevisionData)) {
    errorMessage = 'This page requires a password.'
  }

  if (errorMessage) {
    return <Error message={errorMessage} />
  }

  return (
    <Post
      key={`Post${postWithRevisionData.id}`}
      postData={postWithRevisionData}
    />
  )
}

Singular.displayName = 'Singular'

export default createPage(Singular, {
  autoOpenFacebookModal: ({url: {query: {type}}}) => type === 'post',
  fullWidth: true,
  maxWidth: 3,
  propPaths: ({asPath, query: {p, password, page_id, preview, preview_id, type, slug}}) => ({
    postData: {
      authorize: !!preview,
      makeSingle: true,
      path: (p || page_id) ? `/wp/v2/${type}s/${p || page_id}/?_embed` : `/wp/v2/${type}s?_embed&slug=${slug}&password=${password}`
    },
    revisionsData: preview ? {
      authorize: true,
      path: `/wp/v2/${type}s/${p || page_id || preview_id}/revisions`
    } : null
  })
})
