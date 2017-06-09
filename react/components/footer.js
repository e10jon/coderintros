// @flow

import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

const Footer = (props: Object, {siteData}: Object) => (
  <footer>
    <hr className='mt3 mb3 sm-mt4' />

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
