// @flow

import React, {Component} from 'react'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'

import createModal from '../../helpers/create-modal'
import trackEvent from '../../helpers/track-event'

export const didLikeFBPageStoreKey = 'didLikeFBPage'

class Like extends Component {
  static contextTypes = {
    likeModalStore: PropTypes.object,
    siteData: PropTypes.object
  }

  static displayName = 'Like'

  componentDidMount () {
    // have to reinit the FB SDK for the button to show up
    window.FB.XFBML.parse()

    // after the user likes the page, auto-close the modal
    window.FB.Event.subscribe('edge.create', this.handleFBEdgeCreation)
  }

  shouldComponentUpdate = () => false

  componentWillUnmount () {
    window.FB.Event.unsubscribe('edge.create', this.handleFBEdgeCreation)
  }

  handleFBEdgeCreation = url => {
    if (url === this.context.siteData.facebook_page_url) {
      this.closeAndCookie()
      trackEvent({
        eventCategory: 'Modals',
        eventAction: 'Liked FB Page'
      })
    }
  }

  closeAndCookie = () => {
    this.context.likeModalStore.close()
    Cookies.set(didLikeFBPageStoreKey, true)
  }

  handleAlreadyLikeClick = () => {
    this.closeAndCookie()
    trackEvent({
      eventCategory: 'Modals',
      eventAction: 'Clicked Already Liked Button'
    })
  }

  render () {
    const [titleKey, bodyKey] = this.context.likeModalStore.opts.autoOpened
      ? ['facebook_modal_title_auto_open', 'facebook_modal_body_auto_open']
      : ['facebook_modal_title', 'facebook_modal_body']

    return (
      <div className='center p2'>
        <div
          className='h2 bold line-height-2 my2'
          dangerouslySetInnerHTML={{__html: this.context.siteData[titleKey]}}
        />

        <p
          className='gray px2 sm-px4 mx-auto'
          dangerouslySetInnerHTML={{__html: this.context.siteData[bodyKey]}}
        />

        <div
          className='fb-page'
          data-adapt-container-width='true'
          data-hide-cover='false'
          data-href={this.context.siteData.facebook_page_url}
          data-show-facepile='true'
          data-small-header='false'
        >
          <blockquote
            cite={this.context.siteData.facebook_modal_cta}
            className='fb-xfbml-parse-ignore'
          >
            <a
              className='block bg-silver'
              href={this.context.siteData.facebook_modal_cta}
              style={{height: '320px'}}
            >
              &nbsp;
            </a>
          </blockquote>
        </div>

        {/*
        <div
          className='fb-like'
          data-action='like'
          data-href={this.context.siteData.facebook_page_url}
          data-layout='button'
          data-show-faces='false'
          data-share='false'
          data-size='large'
          data-width={200}
        />
        */}

        <div>
          <a
            className='inline-block py1 px2 h5 mt1 gray'
            href='javascript:void(0)'
            onClick={this.handleAlreadyLikeClick}
          >
            {'I already like your page.'}
          </a>
        </div>
      </div>
    )
  }
}

export default createModal(Like)
