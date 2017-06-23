// @flow

import React, {Component} from 'react'
import {PropTypes as MobxReactPropTypes} from 'mobx-react'
import PropTypes from 'prop-types'

import createModal from '../../helpers/create-modal'
import trackEvent from '../../helpers/track-event'

class Email extends Component {
  static contextTypes = {
    emailModalStore: MobxReactPropTypes.observableObject,
    siteData: PropTypes.object
  }

  static displayName = 'Email'

  componentDidMount () {
    this.mailchimpNode.querySelector('form').addEventListener('submit', this.handleFormSubmission)
  }

  componentWillUnmount () {
    this.mailchimpNode.querySelector('form').removeEventListener('submit', this.handleFormSubmission)
  }

  handleFormSubmission = () => {
    this.context.emailModalStore.close()
    trackEvent({
      eventCategory: 'Modals',
      eventAction: 'Submitted Mailchimp Form'
    })
  }

  mailchimpNode: Object

  render () {
    return (
      <div className='center p2'>
        <div
          dangerouslySetInnerHTML={{__html: this.context.siteData.mailchimp_form_html}}
          ref={r => { this.mailchimpNode = r }}
        />
      </div>
    )
  }
}

export default createModal(Email)
