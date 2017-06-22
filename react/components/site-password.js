// @flow

import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {action, observable} from 'mobx'
import {observer} from 'mobx-react'
import Head from 'next/head'
import PropTypes from 'prop-types'

import {getFetchHeaders, getWordpressUrl} from '../helpers/fetch'

const storeKey = 'sitePassword'

export class PasswordStore {
  @observable isAuthorized = false
  @observable didFailAuthorization = false

  @action authorize = () => {
    this.isAuthorized = true
  }

  @action failedAuthorization = () => {
    this.didFailAuthorization = true
  }
}

@observer
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
      Cookies.set(storeKey, this.passwordNode.value, {expires: 365})
      this.context.sitePasswordStore.authorize()
    } else {
      this.context.sitePasswordStore.failedAuthorization()
    }
  }

  render () {
    return (
      <div>
        <Head>
          <title>{'Password Required'}</title>
        </Head>

        <div
          className='col-12 mx-auto center bg-darken-1 border border-silver py3'
          style={{maxWidth: '500px'}}
        >
          <div className='h2 mb2'>{this.context.siteData.description}</div>
          <div className='h3 my2 gray'>{'Coming soon.'}</div>

          <form onSubmit={this.handleSubmit}>
            <div
              className='flex mt3 col-12 mx-auto'
              style={{maxWidth: '300px'}}
            >
              <input
                className='block input col-9 not-rounded'
                name='password'
                placeholder='Enter password...'
                ref={r => { this.passwordNode = r }}
                style={{borderRight: 'none'}}
                type='text'
              />

              <button
                className={`input regular block col-3 not-rounded btn-primary border-none ${this.context.sitePasswordStore.didFailAuthorization ? 'bg-red' : ''}`}
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
  siteData: PropTypes.object,
  sitePasswordStore: PropTypes.object
}

export default SitePassword
