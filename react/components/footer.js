// @flow

import React from 'react'
import moment from 'moment'

const Footer = () => (
  <footer>
    <hr className='mt4 mb3' />

    <div
      className='center gray h5 ups'
      dangerouslySetInnerHTML={{__html: `&copy;${moment().format('YYYY')} Wordact`}}
    />
  </footer>
)

export default Footer
