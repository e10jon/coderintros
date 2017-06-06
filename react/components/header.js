// @flow

import React from 'react'
import PropTypes from 'prop-types'

import Link from '../helpers/link'

const Header = (props: Object, {pagesData}: Object) => (
  <header className='flex justify-between my1'>
    <div>
      <Link href='/'>{'Home'}</Link>
    </div>

    <div>
      {pagesData && pagesData.map(p => (
        <a
          className='block'
          dangerouslySetInnerHTML={{__html: p.title.rendered}}
          href={p.link}
          key={`HeaderPage${p.id}`}
        />
      ))}
    </div>
  </header>
)

Header.contextTypes = {
  pagesData: PropTypes.array
}

export default Header
