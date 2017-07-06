// @flow

import React, {Component} from 'react'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'
import Cookies from 'js-cookie'
import Head from 'next/head'
import PropTypes from 'prop-types'
import 'isomorphic-fetch'

import EmailModal from '../components/modals/email'
import Footer from '../components/footer'
import {getFetchHeaders, getWordpressUrl} from './fetch'
import Header from '../components/header'
import LikeModal, {didLikeFBPageStoreKey} from '../components/modals/like'
import SitePassword from '../components/site-password'
import HeaderStore from '../stores/header'
import ModalStore from '../stores/modal'
import SitePasswordStore from '../stores/site-password'
import styles from '../styles/app.scss'
import trackEvent from '../helpers/track-event'

@observer
export default function (Child: Object, {propPaths = () => ({}), fullWidth = false, maxWidth = 4, autoOpenFacebookModal = false}: Object = {}) {
  const fullWidthClassName = (props: Object) => {
    const isFull = typeof fullWidth === 'function' ? fullWidth(props) : fullWidth
    return isFull ? '' : 'page-x-spacing'
  }

  const maxWidthClassName = (props: Object) => {
    return `max-width-${typeof maxWidth === 'function' ? maxWidth(props) : maxWidth}`
  }

  class Page extends Component {
    static displayName = `${Child.displayName}Page`

    static childContextTypes = {
      emailModalStore: MobxReactPropTypes.observableObject,
      headerStore: MobxReactPropTypes.observableObject,
      likeModalStore: MobxReactPropTypes.observableObject,
      pagesData: PropTypes.array,
      siteData: PropTypes.object,
      sitePasswordStore: MobxReactPropTypes.observableObject
    }

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
      }, {fetchCache})

      return finalProps
    }

    getChildContext = () => ({
      emailModalStore: this.emailModalStore,
      headerStore: this.headerStore,
      likeModalStore: this.likeModalStore,
      pagesData: this.props.pagesData,
      siteData: this.props.siteData,
      sitePasswordStore: this.sitePasswordStore
    })

    componentWillMount () {
      this.emailModalStore = new ModalStore()
      this.headerStore = new HeaderStore()
      this.likeModalStore = new ModalStore()
      if (this.props.siteData.site_password_enabled) {
        this.sitePasswordStore = new SitePasswordStore()
      }
    }

    componentDidMount () {
      if ((typeof autoOpenFacebookModal === 'function' ? autoOpenFacebookModal(this.props) : autoOpenFacebookModal) &&
      this.props.siteData.facebook_modal_delay) {
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

    emailModalStore: Object
    headerStore: Object
    likeModalStore: Object
    props: {
      fetchCache: Object,
      pagesData: Object,
      postsData: Object,
      siteData: Object
    }
    sitePasswordStore: Object

    render () {
      return (
        <div className='sans-serif black'>
          <Head>
            <style dangerouslySetInnerHTML={{__html: styles}} />
          </Head>

          <div className='max-width-3 mx-auto'>
            <div className='page-x-spacing'>
              <Header />
            </div>
          </div>

          {this.sitePasswordStore && !this.sitePasswordStore.isAuthorized &&
          (!this.props.postsData || !this.props.postsData[0] || !this.props.postsData[0]._formatting ||
          !this.props.postsData[0]._formatting.skip_site_password)
            ? <SitePassword /> : (
              <main className={`${maxWidthClassName(this.props)} mx-auto`}>
                <div className={fullWidthClassName(this.props)}>
                  <Child {...this.props} />
                </div>
              </main>
            )
          }

          <div className='max-width-3 mx-auto'>
            <div className='page-x-spacing'>
              <Footer />
            </div>
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
