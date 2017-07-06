// @flow

import React from 'react'
import Link from 'next/link'

import createModal from '../../../helpers/create-modal'
import {getUrlObj} from '../../../helpers/post-data'

const ThankYou = () => (
  <div className='m2'>
    <div className='my2 h2 line-height-3'>{"You're good to go!"}</div>
    <p>{"Thank you so much for your submission. It will soon be reviewed and edited. We'll send you an email once it's published and ready to be shared."}</p>
    <p>{'Now, would you be so kind to spread the word and suggest someone you know?'}</p>
    <div className='mt2'>
      <Link
        as='/suggest'
        href={getUrlObj({slug: 'suggest', type: 'page'})}
      >
        <a className='btn btn-primary'>{'Suggest'}</a>
      </Link>
    </div>
  </div>
)

export default createModal(ThankYou, {
  hideCloseButton: true,
  isOpen: true
})
