// @flow

import React, {Component} from 'react'
import getHeight from 'dom-helpers/query/height'
import getScrollTop from 'dom-helpers/query/scrollTop'
import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'
import raf from 'raf'
import {IoIosEmailOutline, IoSocialFacebookOutline} from 'react-icons/lib/io'
import {observer, PropTypes as MobxReactPropTypes} from 'mobx-react'

import styles from '../styles/components/header.scss'
import trackEvent from '../helpers/track-event'

@observer
class Header extends Component {
  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleScroll)
  }

  handleEmailClick = () => {
    this.context.emailModalStore.open()
    trackEvent({
      eventCategory: 'Modals',
      eventAction: 'Opened Email From Header'
    })
  }

  handleFacebookClick = () => {
    this.context.likeModalStore.open()
    trackEvent({
      eventCategory: 'Modals',
      eventAction: 'Opened Like From Header'
    })
  }

  handleScroll = () => {
    raf(this.updateScrollHeader)
  }

  updateScrollHeader = () => {
    if (this.context.headerStore.scrollHeaderIsEnabled) {
      const containerRect = this.node.getBoundingClientRect()

      if (!this.context.headerStore.scrollHeaderIsVisible && window.pageYOffset > containerRect.height) {
        this.context.headerStore.scrollHeaderIsVisible = true
      } else if (this.context.headerStore.scrollHeaderIsVisible && window.pageYOffset <= containerRect.height) {
        this.context.headerStore.scrollHeaderIsVisible = false
      }

      const scrollTop = getScrollTop(document.body)
      const clientHeight = getHeight(document.body, true)
      const scrollHeight = document.body ? document.body.scrollHeight : 0
      const decimal = scrollTop / (scrollHeight - clientHeight)
      this.progressNode.style.width = `${decimal * 100}%`
    }
  }

  node: Object
  progressNode: Object

  render () {
    const aClassName = 'inline-block'
    const iconClassName = 'header-icon'

    return (
      <header>
        <Head>
          <style dangerouslySetInnerHTML={{__html: styles}} />
        </Head>

        {this.context.headerStore.scrollHeaderIsEnabled ? (
          <div className={`fixed top-0 right-0 left-0 bg-black header-scroll header-scroll-${this.context.headerStore.scrollHeaderIsVisible ? 'show' : 'hide'}`}>
            <div
              className='absolute top-0 right-0 bottom-0 left-0 bg-red'
              ref={r => { this.progressNode = r }}
              style={{width: '0%'}}
            />

            <div className='absolute top-0 right-0 bottom-0 left-0 flex items-center'>
              <img
                alt={`${this.context.siteData.name} logo`}
                className='fit block mx1 sm-mx2 lg-mx3 header-scroll-logo'
                src={this.context.siteData.images['apple-icon-180x180']}
              />

              {this.context.headerStore.scrollTitle ? (
                <div className='white h3'>{this.context.headerStore.scrollTitle}</div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div ref={r => { this.node = r }}>
          <div className='flex items-center justify-between py2 lg-py3 bg-white'>
            <div>
              <a
                className={aClassName}
                href='javascript:void(0)'
                onClick={this.handleEmailClick}
              >
                <IoIosEmailOutline className={iconClassName} />
              </a>
            </div>

            <div className='flex-auto center'>
              <Link href='/'>
                <a className='block col-12 header-logo mx-auto'>
                  <img
                    alt={`${this.context.siteData.name} logo`}
                    className='block fit'
                    src={this.context.siteData.images.logo}
                  />
                </a>
              </Link>
            </div>

            <div>
              {this.context.siteData.facebook_page_url ? (
                <a
                  className={aClassName}
                  href='javascript:void(0)'
                  onClick={this.handleFacebookClick}
                >
                  <IoSocialFacebookOutline className={iconClassName} />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Header.contextTypes = {
  emailModalStore: MobxReactPropTypes.observableObject,
  headerStore: MobxReactPropTypes.observableObject,
  likeModalStore: MobxReactPropTypes.observableObject,
  pagesData: PropTypes.array,
  siteData: PropTypes.object
}

export default Header
