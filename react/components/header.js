// @flow

import React from 'react'
import PropTypes from 'prop-types'

import Link from '../helpers/link'

const Header = (props: Object, {siteData}: Object) => (
  <header>
    <div className='center my2 sm-my4'>
      <Link href='/'>
        <img
          alt={siteData.name}
          className='col-8'
          src='/static/img/logo.svg'
          style={{maxWidth: '400px'}}
        />
      </Link>
    </div>
  </header>
)

Header.contextTypes = {
  pagesData: PropTypes.array,
  siteData: PropTypes.object
}

export default Header
