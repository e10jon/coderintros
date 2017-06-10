// @flow

import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

const Footer = (props: Object, {pagesData, siteData}: Object) => (
  <footer>
    <hr className='mt3 mb3 sm-mt4' />

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

    <div
      className='center gray my3 h5 ups'
      dangerouslySetInnerHTML={{__html: `&copy;${moment().format('YYYY')} ${siteData.name}`}}
    />
  </footer>
)

Footer.contextTypes = {
  pagesData: PropTypes.array,
  siteData: PropTypes.object
}

export default Footer
