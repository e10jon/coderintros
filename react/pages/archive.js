// @flow

import React from 'react'
import Head from 'next/head'

import createPage from '../helpers/create-page'

const Archive = ({postsData}: Object) => {
  return (
    <div>
      <Head>
        <title>{'Archive'}</title>
      </Head>

      <div className='h2 my4 center'>{'Coming soon'}</div>
    </div>
  )
}

Archive.displayName = 'Archive'

export default createPage(Archive)
