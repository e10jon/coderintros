// @flow

import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import PropTypes from 'prop-types'

import {getUrlObj} from '../helpers/post-data'

const Footer = (props: Object, {pagesData, siteData}: Object) => (
  <footer>
    <div className='max-width-3 mx-auto'>
      <div className='page-x-spacing'>
        <div className='center my3'>
          {pagesData && pagesData.map(p => (
            <Link
              as={p.link}
              href={getUrlObj(p)}
              key={`HeaderPage${p.id}`}
            >
              <a
                className='inline-block p1 ups gray h5'
                dangerouslySetInnerHTML={{__html: p.title.rendered}}
              />
            </Link>
          ))}
        </div>

        <div
          className='center gray my3 h5 ups'
          dangerouslySetInnerHTML={{__html: `&copy;${moment().format('YYYY')} ${siteData.name}`}}
        />
      </div>
    </div>
  </footer>
)

Footer.contextTypes = {
  pagesData: PropTypes.array,
  siteData: PropTypes.object
}

export default Footer
