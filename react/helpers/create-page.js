// @flow

import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Head from 'next/head'
import {observer} from 'mobx-react'
import PropTypes from 'prop-types'
import 'isomorphic-fetch'

import EmailModal from '../components/modals/email'
import Footer from '../components/footer'
import {getFetchHeaders, getWordpressUrl} from './fetch'
import Header from '../components/header'
import LikeModal, {didLikeFBPageStoreKey} from '../components/modals/like'
import SitePassword, {PasswordStore} from '../components/site-password'
import HeaderStore from '../stores/header'
import ModalStore from '../stores/modal'
import styles from '../styles/app.scss'
import trackEvent from '../helpers/track-event'

const DevTools = process.env.NODE_ENV !== 'production'
  ? require('mobx-react-devtools')
  : null

if (DevTools) {
  DevTools.configureDevtool({
    logEnabled: true
  })
}

const getHrClassName = (className: string, opt: mixed) =>
  typeof opt === 'string' ? `${className} ${opt}` : className

@observer
export default function (Child: Object, {
  propPaths = () => ({}),
  childContextTypes = {},
  fullWidth = false,
  hrBottom = true,
  hrTop = true,
  maxWidth = 4,
  getChildContext = () => ({})
}: Object = {}) {
  class Page extends Component {
    static displayName = `${Child.displayName}Page`

    static childContextTypes = Object.assign({}, {
      emailModalStore: PropTypes.object,
      headerStore: PropTypes.object,
      likeModalStore: PropTypes.object,
      pagesData: PropTypes.array,
      siteData: PropTypes.object,
      sitePasswordStore: PropTypes.object
    }, childContextTypes)

    static async getInitialProps ({asPath, req, query}) {
      const paths = Object.assign({}, {
        pagesData: '/wp/v2/pages?orderby=menu_order&order=asc',
        siteData: '/ci/site_details'
      }, propPaths({asPath, query}))
      const pathsKeys = Object.keys(paths).filter(k => paths[k])

      const fetchCache = global.__FETCH__DATA__ || {}

      let fetches = await Promise.all(pathsKeys.map(async k => {
        const input = paths[k]
        const [path, authorize] = typeof input === 'string' ? [input, false] : [input.path, input.authorize]

        if (fetchCache[path]) {
          return fetchCache[path]
        }

        const res = await global.fetch(getWordpressUrl(path), {
          credentials: authorize ? 'include' : 'omit',
          headers: getFetchHeaders({
            authorize,
            cookiejar: req ? req.headers.cookie : window.document.cookie
          })
        })

        fetchCache[path] = await res.json()

        return fetchCache[path]
      }))

      const finalProps = pathsKeys.reduce((obj, key, i) => {
        obj[key] = fetches[i]
        return obj
      }, {})

      finalProps.fetchCache = fetchCache

      return finalProps
    }

    getChildContext = () => Object.assign({}, {
      emailModalStore: this.emailModalStore,
      headerStore: this.headerStore,
      likeModalStore: this.likeModalStore,
      pagesData: this.props.pagesData,
      siteData: this.props.siteData,
      sitePasswordStore: this.sitePasswordStore
    }, getChildContext.call(this))

    componentWillMount () {
      this.emailModalStore = new ModalStore()
      this.headerStore = new HeaderStore()
      this.likeModalStore = new ModalStore()
      if (this.props.siteData.site_password_enabled) {
        this.sitePasswordStore = new PasswordStore()
      }
    }

    componentDidMount () {
      if (this.props.siteData.facebook_modal_delay) {
        setTimeout(() => {
          if (!Cookies.get(didLikeFBPageStoreKey) && !this.emailModalStore.isOpen) {
            this.likeModalStore.autoOpen()
            trackEvent({
              eventCategory: 'Modals',
              eventAction: 'Auto-Opened Like'
            })
          }
        }, this.props.siteData.facebook_modal_delay)
      }
    }

    fullWidthClassName = (() => {
      const isFull = typeof fullWidth === 'function' ? fullWidth(this.props) : fullWidth
      return isFull ? '' : 'page-x-spacing'
    })()
    hrBottomClassName = getHrClassName('mt3', hrBottom)
    hrTopClassName = getHrClassName('mb3', hrTop)
    maxWidthClassName = (() => {
      return `max-width-${typeof maxWidth === 'function' ? maxWidth(this.props) : maxWidth}`
    })()

    emailModalStore: Object
    headerStore: Object
    likeModalStore: Object
    sitePasswordStore: Object

    render () {
      return (
        <div className='sans-serif black'>
          <Head>
            <style dangerouslySetInnerHTML={{__html: styles}} />
          </Head>

          {DevTools ? <DevTools.default /> : null}

          <div className='max-width-3 mx-auto page-x-spacing'>
            <Header />
          </div>

          {this.sitePasswordStore && !this.sitePasswordStore.isAuthorized ? (
            <SitePassword />
          ) : (
            <main className={`${this.maxWidthClassName} mx-auto ${this.fullWidthClassName}`}>
              {hrTop ? <hr className={this.hrTopClassName} /> : null}

              <Child {...this.props} />

              {hrBottom ? <hr className={this.hrBottomClassName} /> : null}
            </main>
          )}

          <div className='max-width-3 mx-auto page-x-spacing'>
            <Footer />
          </div>

          <EmailModal store={this.emailModalStore} />
          <LikeModal store={this.likeModalStore} />

          <script dangerouslySetInnerHTML={{__html: `window.__FETCH__DATA__ = ${JSON.stringify(this.props.fetchCache)}`}} />
        </div>
      )
    }
  }

  return Page
}
