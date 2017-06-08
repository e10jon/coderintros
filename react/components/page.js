// @flow

import React, {Component} from 'react'
import Head from 'next/head'
import isNode from 'detect-node'
import PropTypes from 'prop-types'

import fetch from '../helpers/fetch'
import Footer from './footer'
import Header from './header'

export default function (Child: Object, {
  propPaths = () => ({}),
  childContextTypes = {},
  getChildContext = () => ({})
}: Object = {}) {
  class Page extends Component {
    static childContextTypes = Object.assign({}, {
      pagesData: PropTypes.array,
      siteData: PropTypes.object
    }, childContextTypes)

    static async getInitialProps ({asPath, req, query}) {
      const paths = Object.assign({}, {
        pagesData: '/wp/v2/pages',
        siteData: '/'
      }, propPaths({asPath, query}))
      const pathsKeys = Object.keys(paths)

      const fetches = await Promise.all(pathsKeys.map(k => (
        fetch({
          cookiejar: isNode ? req.headers.cookie : window.document.cookie,
          path: paths[k]
        })
      )))

      return pathsKeys.reduce((obj, key, i) => {
        obj[key] = fetches[i].data
        return obj
      }, {})
    }

    getChildContext = () => Object.assign({}, {
      pagesData: this.props.pagesData,
      siteData: this.props.siteData
    }, getChildContext.call(this))

    shouldComponentUpdate = () => false

    render () {
      return (
        <div>
          <Head>
            <meta
              content='width=device-width,initial-scale=1'
              name='viewport'
            />

            <link
              href='/static/css/ace.min.css'
              rel='stylesheet'
              type='text/css'
            />
            <link
              href='/static/css/app.css'
              rel='stylesheet'
              type='text/css'
            />

            <script dangerouslySetInnerHTML={{__html: `window.HOST = "${global.HOST}";`}} />
          </Head>

          <div className='max-width-3 mx-auto px2 min-height-100vh'>
            <Header />

            <main className='flex-auto bg-white'>
              <Child {...this.props} />
            </main>

            <Footer />
          </div>
        </div>
      )
    }
  }

  return Page
}
