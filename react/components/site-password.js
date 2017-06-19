// @flow

import React, {Component} from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import URL from 'url'

export const sitePasswordKey = 'sitePassword'

class SitePassword extends Component {
  handleSubmit = (e: Object) => {
    e.preventDefault()
    const urlObj: Object = URL.parse(window.location.href, true)
    urlObj.query.password = this.passwordNode.value
    urlObj.search = null
    window.location = URL.format(urlObj)
  }

  passwordNode: Object

  render () {
    return (
      <div className='page-x-spacing'>
        <Head>
          <title>{'Password Required'}</title>
        </Head>

        <hr className='mt3 mb3 sm-mb4 ' />

        <div
          className='col-12 mx-auto center my3'
          style={{maxWidth: '500px'}}
        >
          <div className='h2 my2'>{this.context.siteData.description}</div>
          <div className='h3 my2 gray'>{'Coming soon.'}</div>

          <form onSubmit={this.handleSubmit}>
            <div
              className='flex my3 col-12 mx-auto'
              style={{maxWidth: '350px'}}
            >
              <input
                className='block input col-10 not-rounded'
                name='password'
                placeholder='Enter password to continue...'
                ref={r => { this.passwordNode = r }}
                style={{borderRight: 'none'}}
                type='text'
              />

              <button
                className='input regular block col-2 not-rounded btn-primary border-none'
                type='submit'
              >
                {'Enter'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

SitePassword.contextTypes = {
  siteData: PropTypes.object
}

export default SitePassword
