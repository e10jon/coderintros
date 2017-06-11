// @flow

import React from 'react'
import PropTypes from 'prop-types'

import Link from '../helpers/link'

const Header = (props: Object, {emailModalStore, likeModalStore, siteData}: Object) => {
  const handleEmailClick = e => {
    e.preventDefault()
    emailModalStore.open()
  }

  const handleFacebookClick = e => {
    e.preventDefault()
    likeModalStore.open()
  }

  return (
    <header>
      <div className='flex items-center my2 sm-my4'>
        <div className='col-2 sm-col-3'>
          <a
            href='javascript:void(0)'
            onClick={handleEmailClick}
          >
            {'EM'}
          </a>
        </div>

        <Link
          className='col-8 sm-col-6 center'
          href='/'
        >
          <img
            alt={siteData.name}
            className='fit'
            src='/static/img/logo.svg'
          />
        </Link>

        <div className='col-2 sm-col-3 right-align'>
          {siteData.facebook_page_url ? (
            <a
              href='javascript:void(0)'
              onClick={handleFacebookClick}
            >
              {'FB'}
            </a>
          ) : null}
        </div>
      </div>
    </header>
  )
}

Header.contextTypes = {
  emailModalStore: PropTypes.object,
  likeModalStore: PropTypes.object,
  pagesData: PropTypes.array,
  siteData: PropTypes.object
}

export default Header
