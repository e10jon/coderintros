// @flow

import React from 'react'
import Head from 'next/head'

import createPage from '../helpers/create-page'

const Archive = ({postsData}: Object) => {
  return (
    <main>
      <Head>
        <title>{'Archive'}</title>
      </Head>

      <div className='h2 my4 center'>{'Coming soon'}</div>
    </main>
  )
}

Archive.displayName = 'Archive'

export default createPage(Archive)
