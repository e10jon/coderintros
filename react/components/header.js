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

@observer
class Header extends Component {
  static contextTypes = {
    emailModalStore: MobxReactPropTypes.observableObject,
    headerStore: MobxReactPropTypes.observableObject,
    likeModalStore: MobxReactPropTypes.observableObject,
    pagesData: PropTypes.array,
    siteData: PropTypes.object
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleScroll)
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

      if (this.context.headerStore.progress !== 1) {
        const scrollTop = getScrollTop(document.body)
        const clientHeight = getHeight(document.body, true)
        const scrollHeight = document.body ? document.body.scrollHeight : 0
        const decimal = scrollTop / (scrollHeight - clientHeight)
        this.context.headerStore.progress = decimal
      }
    }
  }

  node: Object

  render () {
    const aClassName = 'inline-block'
    const iconClassName = 'header-icon'

    return (
      <header>
        <Head>
          <style dangerouslySetInnerHTML={{__html: styles}} />
        </Head>

        {this.context.headerStore.scrollHeaderIsEnabled ? (
          <div className={`fixed z1 top-0 right-0 left-0 header-scroll header-scroll-${this.context.headerStore.scrollHeaderIsVisible ? 'show' : 'hide'}`}>
            <div
              className='absolute top-0 right-0 bottom-0 left-0 flex items-center'
            >
              <div
                className='row-12 header-progress-gradient'
                style={{flex: `0 0 ${this.context.headerStore.progressPercentage}`}}
              />

              <div
                className='header-bg-black row-12 relative'
                style={{flex: '0 0 20px'}}
              >
                <div className='row-12 header-progress-arrow' />
              </div>

              <div className='flex-auto row-12 header-bg-black flex items-center'>
                <div
                  className='header-progress-text'
                  dangerouslySetInnerHTML={{__html: this.context.headerStore.progressPercentage}}
                />
              </div>
            </div>

            <div className={`row-12 header-progress-finished ${this.context.headerStore.progress === 1 ? 'col-12' : ''}`} />

            <div className='absolute top-0 right-0 bottom-0 left-0 flex items-center'>
              <img
                alt={`${this.context.siteData.name} logo`}
                className='fit block mx1 sm-mx2 md-mx3 header-scroll-logo'
                src={this.context.siteData.images['apple-icon-180x180']}
              />

              {this.context.headerStore.scrollTitle ? (
                <div className='white h3 nowrap'>{this.context.headerStore.scrollTitle}</div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div ref={r => { this.node = r }}>
          <div className='flex items-center justify-between py2 md-py3 bg-white'>
            <div>
              <a
                className={aClassName}
                data-ga-event-action='Opened Email From Header'
                data-ga-event-category='Modals'
                data-ga-on='click'
                href='javascript:void(0)'
                onClick={this.context.emailModalStore.handleOpen}
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
                  data-ga-event-action='Opened Like From Header'
                  data-ga-event-category='Modals'
                  data-ga-on='click'
                  href='javascript:void(0)'
                  onClick={this.context.likeModalStore.handleOpen}
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

export default Header
