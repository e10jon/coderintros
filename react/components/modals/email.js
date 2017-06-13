// @flow

import React from 'react'
import PropTypes from 'prop-types'

import createModal from '../../helpers/create-modal'

const Email = (props, {siteData}: Object) => {
  return (
    <div className='center p2'>
      <div dangerouslySetInnerHTML={{__html: siteData.mailchimp_form_html}} />
    </div>
  )
}

Email.contextTypes = {
  siteData: PropTypes.object
}

export default createModal(Email)
