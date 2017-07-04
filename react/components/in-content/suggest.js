// @flow

import React from 'react'
import Link from 'next/link'

import {getUrlObj} from '../../helpers/post-data'

const Suggest = () => (
  <Link
    as='/suggest'
    href={getUrlObj({type: 'page', slug: 'suggest'})}
  >
    <a
      className='block sans-serif border border-gray p2 mx-auto bg-darken-0 bg-cover bg-no-repeat bg-right flex flex-column justify-center'
      data-ga-event-action='Clicked Suggest'
      data-ga-event-category='In-content Units'
      data-ga-on='click'
      style={{
        height: '280px',
        maxWidth: '336px'
      }}
    >
      <div className='h2 mb2 line-height-3 bold'>
        {'Do you know someone who would be great for Coder Intros?'}
      </div>

      <div>
        <span className='btn btn-primary'>
          {'Suggest them'}
        </span>
      </div>
    </a>
  </Link>
)

export default Suggest
