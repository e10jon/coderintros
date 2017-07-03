// @flow

import React from 'react'
import Link from 'next/link'

import {getUrlObj} from '../../helpers/post-data'

const Suggest = () => (
  <div
    className='sans-serif border border-gray p2 mx-auto bg-darken-0'
    style={{maxWidth: '400px'}}
  >
    <div className='h3 mb3 mt1 line-height-3'>{'Do you know someone who would be great for Coder Intros?'}</div>

    <div className='mt2'>
      <Link
        as='/suggest'
        href={getUrlObj({type: 'page', slug: 'suggest'})}
      >
        <a className='btn btn-primary'>
          {'Suggest'}
        </a>
      </Link>
    </div>
  </div>
)

export default Suggest
