// @flow

import React, {Component} from 'react'
import Head from 'next/head'
import URL from 'url'

import {pageXSpacing} from '../helpers/create-page'

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
      <div className={pageXSpacing}>
        <Head>
          <title>{'Password Required'}</title>
        </Head>

        <hr className='mt3 mb3 sm-mb4 ' />

        <div className='center h2 my2 bold'>{'This site requires a password.'}</div>

        <div className='flex'>
          <div className='col-10 sm-col-8 md-col-6 mx-auto center'>
            <form onSubmit={this.handleSubmit}>
              <input
                className='center input'
                name='password'
                ref={r => { this.passwordNode = r }}
                type='text'
              />

              <button
                className='btn btn-primary ups regular'
                type='submit'
              >
                {'Enter'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SitePassword
