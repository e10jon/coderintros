// @flow

import React, {Component} from 'react'
import PropTypes from 'prop-types'

import createModal from '../../helpers/create-modal'

class Email extends Component {
  static contextTypes = {
    siteData: PropTypes.object
  }

  static displayName = 'Email'

  props: {
    store: Object
  }

  handleFormSubmission = () => {
    this.props.store.close()
  }

  render () {
    return (
      <div className='p3 bg-darken-0'>
        <div className='h2 bold line-height-3 mb2'>{'Get intros in your inbox'}</div>

        <form
          action={this.context.siteData.mailchimp_newsletter_url}
          method='post'
          onSubmit={this.handleFormSubmission}
          target='_blank'
        >
          <div className='flex'>
            <input
              className='input mb0 col-9 flex-auto not-rounded border-right-none'
              name='EMAIL'
              placeholder='youremail@domain.com'
              type='email'
            />

            <input
              name={`group[${this.context.siteData.mailchimp_frequency_group}]`}
              type='hidden'
              value='2'
            />

            <button
              className='btn btn-primary col-3 h5 regular ups not-rounded border-left-none'
              style={{flex: '0 0 80px'}}
              type='submit'
            >
              {'Submit'}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default createModal(Email)
