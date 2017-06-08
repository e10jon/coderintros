// @flow

import React from 'react'
import PropTypes from 'prop-types'

import Link from '../helpers/link'

const Header = (props: Object, {pagesData, siteData}: Object) => (
  <header>
    <div className='center mt4 mb2'>
      <h1
        className='ups'
        style={{fontSize: '3rem'}}
      >
        <Link href='/'>{siteData.name}</Link>
      </h1>
    </div>

    <div className='center my3'>
      {pagesData && pagesData.map(p => (
        <a
          className='inline-block p1 ups gray h5'
          dangerouslySetInnerHTML={{__html: p.title.rendered}}
          href={p.link}
          key={`HeaderPage${p.id}`}
        />
      ))}
    </div>
  </header>
)

Header.contextTypes = {
  pagesData: PropTypes.array,
  siteData: PropTypes.object
}

export default Header
