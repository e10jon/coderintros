// @flow

import React, {PureComponent} from 'react'
import Link from 'next/link'

import createModal from '../../../helpers/create-modal'
import {getUrlObj} from '../../../helpers/post-data'

class ThankYou extends PureComponent {
  componentDidMount () {
    if (window.fbq) {
      window.fbq('track', 'CompleteRegistration')
    }
  }

  render () {
    return (
      <div className='p3 bg-darken-0'>
        <div className='h2 bold line-height-3 mb2'>{'You\'re good to go!'}</div>

        <p>{'Thank you so much for your submission. No further action is required from you at this point.'}</p>
        <p>{'We will review and lightly edit your submission soon. We may contact you to gather additional information.'}</p>
        <p>{'Once your intro is published and ready to be shared, we\'ll send you an email.'}</p>
        <p>{'Now, would you be so kind as to spread the word and suggest someone you know?'}</p>

        <div className='mt2'>
          <Link
            as='/suggest'
            href={getUrlObj({slug: 'suggest', type: 'page'})}
          >
            <a className='btn btn-primary'>{'Suggest someone'}</a>
          </Link>
        </div>
      </div>
    )
  }
}

export default createModal(ThankYou, {
  hideCloseButton: true,
  isOpen: true
})
