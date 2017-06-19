// @flow

import React, {Component} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {IoIosEmailOutline, IoSocialFacebookOutline} from 'react-icons/lib/io'

import styles from '../styles/components/header.scss'
import trackEvent from '../helpers/track-event'

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
    // const containerRect = this.node.getBoundingClientRect()
    //
    // if (!this.isHeaderFixed && window.pageYOffset > containerRect.height) {
    //   this.node.className += ' fixed top-0 right-0 bottom-0 left-0'
    //   this.spacerNode.style.height = `${containerRect.height}px`
    //   this.spacerNode.style.display = 'block'
    //   this.isHeaderFixed = true
    // }
  }

  render () {
    const aClassName = 'inline-block'
    const iconClassName = 'header-icon'

    return (
      <header>
        <Head>
          <style dangerouslySetInnerHTML={{__html: styles}} />
        </Head>

        <div
          className='max-width-4 mx-auto'
          ref={r => { this.node = r }}
        >
          <div className='flex items-center justify-between py2 sm-py4 page-x-spacing bg-white'>
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
                <a className='block header-logo mx-auto'>
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
  emailModalStore: PropTypes.object,
  likeModalStore: PropTypes.object,
  pagesData: PropTypes.array,
  siteData: PropTypes.object
}

export default Header
