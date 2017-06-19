// @flow

import React, {Component} from 'react'
import {action, observable} from 'mobx'
import Head from 'next/head'
import PropTypes from 'prop-types'

import {getFetchHeaders, getWordpressUrl} from '../helpers/fetch'

export const createSitePasswordStore = () => (
  observable({
    isAuthorized: false,
    authorize: action(function authorize () {
      this.isAuthorized = true
    })
  })
)

class SitePassword extends Component {
  handleSubmit = async (e: Object) => {
    e.preventDefault()

    const res = await global.fetch(getWordpressUrl('/ci/site_password'), {
      method: 'POST',
      headers: getFetchHeaders(),
      body: this.passwordNode.value
    })

    if (res.status >= 200 && res.status < 400) {
      this.context.sitePasswordStore.authorize()
    }
  }

  passwordNode: Object

  render () {
    return (
      <main className='max-width-4 mx-auto'>
        <div className='page-x-spacing'>
          <Head>
            <title>{'Password Required'}</title>
          </Head>

          <hr className='mt3 mb3 sm-mb4' />

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

        <hr className='mt3 mb3 sm-mt4' />
      </main>
    )
  }
}

SitePassword.contextTypes = {
  siteData: PropTypes.object,
  sitePasswordStore: PropTypes.object
}

export default SitePassword
