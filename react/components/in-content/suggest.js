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
      className='sans-serif border border-gray mx-auto bg-darken-0 flex flex-wrap'
      data-ga-event-action='Clicked Suggest'
      data-ga-event-category='In-content Units'
      data-ga-on='click'
      style={{
        height: '280px',
        maxWidth: '560px',
        textDecoration: 'none'
      }}
    >
      <div className='col-12 sm-col-7 px3 self-center right-align'>
        <div
          className='h2 mb2 line-height-3 bold mr0 ml-auto'
          style={{maxWidth: '270px'}}
        >
          {'Do you know someone who would be great for Coder Intros?'}
        </div>

        <div>
          <span className='btn btn-primary'>
            {'Suggest them'}
          </span>
        </div>
      </div>

      <div
        className='xs-hide sm-col-5 self-stretch bg-cover bg-top bg-no-repeat bg-center'
        style={{
          backgroundImage: 'url(/static/img/in-content/suggest-a-coder-unknown-face.jpg)'
        }}
      />
    </a>
  </Link>
)

export default Suggest
