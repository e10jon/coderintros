// @flow

import React from 'react'
import PropTypes from 'prop-types'

import Link from '../helpers/link'

const Header = (props: Object, {siteData}: Object) => (
  <header>
    <div className='flex items-center my2 sm-my4'>
      <div className='col-2 sm-col-3'>{'E'}</div>

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
          <a href={siteData.facebook_page_url}>{'FB'}</a>
        ) : null}
      </div>
    </div>
  </header>
)

Header.contextTypes = {
  pagesData: PropTypes.array,
  siteData: PropTypes.object
}

export default Header
