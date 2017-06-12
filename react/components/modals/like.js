// @flow

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import store from 'store'

import createModal from '../../helpers/create-modal'

export const didLikeFBPageStoreKey = 'didLikeFBPage'

class Like extends Component {
  static contextTypes = {
    likeModalStore: PropTypes.object,
    siteData: PropTypes.object
  }

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
    }
  }

  closeAndCookie = () => {
    this.context.likeModalStore.close()
    store.set(didLikeFBPageStoreKey, true)
  }

  handleAlreadyLikeClick = () => {
    this.closeAndCookie()
  }

  render () {
    return (
      <div className='center p2'>
        <div className='h2 bold line-height-2 my3'>{this.context.siteData.facebook_modal_cta}</div>

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

        <div>
          <a
            className='inline-block py1 px2 h5 mt2'
            href='javascript:void(0)'
            onClick={this.handleAlreadyLikeClick}
          >
            {'I already like your page.'}
          </a>
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
        />
        */}
      </div>
    )
  }
}

export default createModal(Like)
