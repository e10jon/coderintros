// @flow

import React from 'react'
import Head from 'next/head'

import {pageXSpacing} from '../helpers/create-page'

export const sitePasswordKey = 'sitePassword'

const SitePassword = () => (
  <div className={pageXSpacing}>
    <Head>
      <title>{'Password Required'}</title>
    </Head>

    <hr className='mt3 mb3 sm-mb4 ' />

    <div className='center h2'>{'This site requires a password.'}</div>
  </div>
)

export default SitePassword
