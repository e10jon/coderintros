// @flow

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {IoIosEmailOutline, IoSocialFacebookOutline} from 'react-icons/lib/io'

import {pageXSpacing} from '../helpers/create-page'
import styles from '../styles/components/header.scss'
import trackEvent from '../helpers/track-event'

const Header = (props: Object, {emailModalStore, likeModalStore, siteData}: Object) => {
  const handleEmailClick = () => {
    emailModalStore.open()
    trackEvent({
      eventCategory: 'Modals',
      eventAction: 'Opened Email From Header'
    })
  }

  const handleFacebookClick = () => {
    likeModalStore.open()
    trackEvent({
      eventCategory: 'Modals',
      eventAction: 'Opened Like From Header'
    })
  }

  const aClassName = 'inline-block'
  const iconClassName = 'header-icon'

  return (
    <header>
      <Head>
        <style dangerouslySetInnerHTML={{__html: styles}} />
      </Head>

      <div className={`flex items-center justify-between my2 sm-my4 ${pageXSpacing}`}>
        <div>
          <a
            className={aClassName}
            href='javascript:void(0)'
            onClick={handleEmailClick}
          >
            <IoIosEmailOutline className={iconClassName} />
          </a>
        </div>

        <div className='flex-auto center'>
          <Link href='/'>
            <a className='block header-logo mx-auto'>
              <img
                alt={`${siteData.name} logo`}
                className='block fit'
                src={siteData.images.logo}
              />
            </a>
          </Link>
        </div>

        <div>
          {siteData.facebook_page_url ? (
            <a
              className={aClassName}
              href='javascript:void(0)'
              onClick={handleFacebookClick}
            >
              <IoSocialFacebookOutline className={iconClassName} />
            </a>
          ) : null}
        </div>
      </div>
    </header>
  )
}

Header.contextTypes = {
  emailModalStore: PropTypes.object,
  likeModalStore: PropTypes.object,
  pagesData: PropTypes.array,
  siteData: PropTypes.object
}

export default Header
