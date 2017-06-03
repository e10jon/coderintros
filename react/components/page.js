// @flow

import React, {Component} from 'react'
import Head from 'next/head'
// import PropTypes from 'prop-types'

import fetch from '../helpers/fetch'
import Header from './header'

export default function (Child: Object, {
  propPaths = () => ({}),
  childContextTypes = {},
  getChildContext = () => ({})
}: Object = {}) {
  class Page extends Component {
    static childContextTypes = Object.assign({}, {}, childContextTypes)

    static async getInitialProps ({asPath, query}) {
      const morePaths = propPaths({asPath, query})
      const morePathsKeys = Object.keys(morePaths)

      const fetches = await Promise.all(morePathsKeys.map(k => (
        fetch(morePaths[k])
      )))

      return morePathsKeys.reduce((obj, key, i) => {
        obj[key] = fetches[i].data
        return obj
      }, {})
    }

    getChildContext = () => Object.assign({}, {}, getChildContext.call(this))

    shouldComponentUpdate = () => false

    render () {
      return (
        <div className='relative overflow-hidden'>
          <Head>
            <meta
              content='width=device-width, initial-scale=1'
              name='viewport'
            />
            <script dangerouslySetInnerHTML={{__html: `window.HOST = "${global.HOST}";`}} />
          </Head>

          <div className='flex flex-column justify-between min-height-100vh'>
            <Header />

            <main className='flex-auto bg-white'>
              <Child {...this.props} />
            </main>
          </div>
        </div>
      )
    }
  }

  return Page
}
