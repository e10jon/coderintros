// @flow

import React, {Component} from 'react'
import isNode from 'detect-node'
import PropTypes from 'prop-types'
import store from 'store'

import {createModalStore} from '../helpers/create-modal'
import EmailModal from '../components/modals/email'
import fetch from './fetch'
import Footer from '../components/footer'
import Header from '../components/header'
import LikeModal, {didLikeFBPageStoreKey} from '../components/modals/like'
import SitePassword from '../components/site-password'
import trackEvent from '../helpers/track-event'

export const pageXSpacing = 'mx2 md-mx0'

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
        pagesData: '/wp/v2/pages?orderby=menu_order&order=asc',
        siteData: '/ci/site_details'
      }, propPaths({asPath, query}))
      const pathsKeys = Object.keys(paths)

      const fetches = await Promise.all(pathsKeys.map(k => (
        fetch({
          cookiejar: isNode ? req.headers.cookie : window.document.cookie,
          path: paths[k]
        })
      )))

      const finalProps = pathsKeys.reduce((obj, key, i) => {
        obj[key] = fetches[i].data
        return obj
      }, {})

      if (finalProps.siteData.site_password_enabled) {
        try {
          await fetch({
            method: 'post',
            path: '/ci/site_password',
            headers: {'X-Site-Password': query.password}
          })
        } catch (err) {
          finalProps.passwordRequired = true
        }
      }

      return finalProps
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
          if (!store.get(didLikeFBPageStoreKey) && !this.emailModalStore.isOpen) {
            this.likeModalStore.open({autoOpened: true})
            trackEvent({
              eventCategory: 'Modals',
              eventAction: 'Auto-Opened Like'
            })
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
          <div className='max-width-3 mx-auto sans-serif black'>
            <Header />

            <main className='flex-auto bg-white'>
              {this.props.passwordRequired ? (
                <SitePassword />
              ) : (
                <Child {...this.props} />
              )}
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
