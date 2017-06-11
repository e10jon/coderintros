// @flow

import React, {Component} from 'react'
import Head from 'next/head'
import isNode from 'detect-node'
import PropTypes from 'prop-types'
import store from 'store'

import {createModalStore} from '../helpers/create-modal'
import {fbInit, gaInit} from './raw'
import EmailModal from '../components/modals/email'
import fetch from './fetch'
import Footer from '../components/footer'
import Header from '../components/header'
import LikeModal, {didLikeFBPageStoreKey} from '../components/modals/like'

export default function (Child: Object, {
  propPaths = () => ({}),
  childContextTypes = {},
  getChildContext = () => ({})
}: Object = {}) {
  class Page extends Component {
    static childContextTypes = Object.assign({}, {
      emailModalStore: PropTypes.object,
      likeModalStore: PropTypes.object,
      pagesData: PropTypes.array,
      siteData: PropTypes.object
    }, childContextTypes)

    static async getInitialProps ({asPath, req, query}) {
      const paths = Object.assign({}, {
        pagesData: '/wp/v2/pages',
        siteData: '/ci/site_details'
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
      emailModalStore: this.emailModalStore,
      likeModalStore: this.likeModalStore,
      pagesData: this.props.pagesData,
      siteData: this.props.siteData
    }, getChildContext.call(this))

    componentWillMount () {
      this.emailModalStore = createModalStore()
      this.likeModalStore = createModalStore()
    }

    componentDidMount () {
      if (this.props.siteData.facebook_modal_delay) {
        setTimeout(() => {
          if (!store.get(didLikeFBPageStoreKey) &&
          !this.emailModalStore.isOpen
          ) {
            this.likeModalStore.open()
          }
        }, this.props.siteData.facebook_modal_delay)
      }
    }

    shouldComponentUpdate = () => false

    emailModalStore: Object
    likeModalStore: Object

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
            <link
              href='https://fonts.googleapis.com/css?family=Lora:400,700|Overpass:400,800'
              rel='stylesheet'
            />

            {/* generated by http://www.favicon-generator.org/ */}
            <link
              href='/static/img/favicon/favicon.ico'
              rel='shortcut icon'
              type='image/x-icon'
            />
            <link
              href='/static/img/favicon/favicon.ico'
              rel='icon'
              type='image/x-icon'
            />
            <link
              href='/static/img/favicon/apple-icon-57x57.png'
              rel='apple-touch-icon'
              sizes='57x57'
            />
            <link
              href='/static/img/favicon/apple-icon-60x60.png'
              rel='apple-touch-icon'
              sizes='60x60'
            />
            <link
              href='/static/img/favicon/apple-icon-72x72.png'
              rel='apple-touch-icon'
              sizes='72x72'
            />
            <link
              href='/static/img/favicon/apple-icon-76x76.png'
              rel='apple-touch-icon'
              sizes='76x76'
            />
            <link
              href='/static/img/favicon/apple-icon-114x114.png'
              rel='apple-touch-icon'
              sizes='114x114'
            />
            <link
              href='/static/img/favicon/apple-icon-120x120.png'
              rel='apple-touch-icon'
              sizes='120x120'
            />
            <link
              href='/static/img/favicon/apple-icon-144x144.png'
              rel='apple-touch-icon'
              sizes='144x144'
            />
            <link
              href='/static/img/favicon/apple-icon-152x152.png'
              rel='apple-touch-icon'
              sizes='152x152'
            />
            <link
              href='/static/img/favicon/apple-icon-180x180.png'
              rel='apple-touch-icon'
              sizes='180x180'
            />
            <link
              href='/static/img/favicon/android-icon-192x192.png'
              rel='icon'
              sizes='192x192'
              type='image/png'
            />
            <link
              href='/static/img/favicon/favicon-32x32.png'
              rel='icon'
              sizes='32x32'
              type='image/png'
            />
            <link
              href='/static/img/favicon/favicon-96x96.png'
              rel='icon'
              sizes='96x96'
              type='image/png'
            />
            <link
              href='/static/img/favicon/favicon-16x16.png'
              rel='icon'
              sizes='16x16'
              type='image/png'
            />
            <link
              href='/static/img/favicon/manifest.json'
              rel='manifest'
            />
            <meta
              content='#ffffff'
              name='msapplication-TileColor'
            />
            <meta
              content='/static/img/favicon/ms-icon-144x144.png'
              name='msapplication-TileImage'
            />
            <meta
              content='#ffffff'
              name='theme-color'
            />

            <script dangerouslySetInnerHTML={{__html: gaInit(this.props.siteData.ga_tracking_id)}} />
            <script
              async
              src='/static/js/autotrack.js'
            />
          </Head>

          <div id='fb-root' />
          <script dangerouslySetInnerHTML={{__html: fbInit(this.props.siteData.facebook_app_id)}} />

          <div className='max-width-3 mx-auto px2 sans-serif black'>
            <Header />

            <main className='flex-auto bg-white'>
              <Child {...this.props} />
            </main>

            <Footer />
          </div>

          <EmailModal store={this.emailModalStore} />
          <LikeModal store={this.likeModalStore} />
        </div>
      )
    }
  }

  return Page
}
