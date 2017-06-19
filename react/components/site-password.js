// @flow

import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {action, observable} from 'mobx'
import {observer} from 'mobx-react'
import Head from 'next/head'
import PropTypes from 'prop-types'

import {getFetchHeaders, getWordpressUrl} from '../helpers/fetch'

const storeKey = 'sitePassword'

export const createSitePasswordStore = () => (
  observable({
    isAuthorized: false,
    didFailAuthorization: false,
    authorize: action(function authorize () {
      this.isAuthorized = true
    }),
    failedAuthorization: action(function failedAuthorization () {
      this.didFailAuthorization = true
    })
  })
)

class SitePassword extends Component {
  componentDidMount () {
    const storedPassword = Cookies.get(storeKey)

    if (storedPassword) {
      this.passwordNode.value = storedPassword
      this.handleSubmit()
    }
  }

  passwordNode: Object

  handleSubmit = async (e: ?Object) => {
    if (e) {
      e.preventDefault()
    }

    const res = await global.fetch(getWordpressUrl('/ci/site_password'), {
      method: 'POST',
      headers: getFetchHeaders(),
      body: this.passwordNode.value
    })

    if (res.status >= 200 && res.status < 400) {
      Cookies.set(storeKey, this.passwordNode.value)
      this.context.sitePasswordStore.authorize()
    } else {
      this.context.sitePasswordStore.failedAuthorization()
    }
  }

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
                  className={`input regular block col-2 not-rounded btn-primary border-none ${this.context.sitePasswordStore.didFailAuthorization ? 'bg-red' : ''}`}
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

export default observer(SitePassword)
