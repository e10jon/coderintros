// @flow

import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

const Footer = (props: Object, {siteData}: Object) => (
  <footer>
    <hr className='mt4 mb3' />

    <div
      className='center gray my3 h5 ups'
      dangerouslySetInnerHTML={{__html: `&copy;${moment().format('YYYY')} ${siteData.name}`}}
    />
  </footer>
)

Footer.contextTypes = {
  siteData: PropTypes.object
}

export default Footer
