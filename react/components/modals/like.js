// @flow

import React, {Component} from 'react'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'

import createModal from '../../helpers/create-modal'
import trackEvent from '../../helpers/track-event'

export const didLikeFBPageStoreKey = 'didLikeFBPage'

class Like extends Component {
  static contextTypes = {
    siteData: PropTypes.object
  }

  static displayName = 'Like'

  componentDidMount () {
    if (window.FB) {
      // have to reinit the FB SDK for the button to show up
      window.FB.XFBML.parse()
      window.FB.Event.subscribe('edge.create', this.handleFBEdgeCreation)
    }
  }

  componentWillUnmount () {
    if (window.FB) {
      window.FB.Event.unsubscribe('edge.create', this.handleFBEdgeCreation)
    }
  }

  props: {
    store: Object
  }

  handleFBEdgeCreation = url => {
    if (url === this.context.siteData.facebook_page_url) {
      this.handleAlreadyLikeClick()

      trackEvent({
        eventCategory: 'Modals',
        eventAction: 'Liked FB Page'
      })
      trackEvent({
        hitType: 'social',
        socialNetwork: 'Facebook',
        socialAction: 'Like',
        socialTarget: url
      })
    }
  }

  handleAlreadyLikeClick = () => {
    this.props.store.close()
    Cookies.set(didLikeFBPageStoreKey, true, {expires: 7})
  }

  render () {
    return (
      <div className='pt3 px3 pb2 bg-darken-0'>
        <div className='h2 bold line-height-3 mb2'>{'Get intros via Facebook'}</div>

        <div
          className='fb-page'
          data-adapt-container-width='true'
          data-hide-cover='false'
          data-href={this.context.siteData.facebook_page_url}
          data-show-facepile='true'
          data-small-header='false'
          data-width='500px'
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

        <div className='center'>
          <a
            className='inline-block h5 pt2 pb1 px2 gray'
            data-ga-event-action='Clicked Already Liked Button'
            data-ga-event-category='Modals'
            data-ga-on='click'
            href='javascript:void(0)'
            onClick={this.handleAlreadyLikeClick}
          >
            {'I already like your page'}
          </a>
        </div>
      </div>
    )
  }
}

export default createModal(Like)
