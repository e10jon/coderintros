// @flow

import React from 'react'
import classNames from 'classnames'
import {FaFacebookOfficial} from 'react-icons/lib/fa'
import {
  IoEmail,
  IoSocialHackernews,
  IoSocialLinkedin,
  IoSocialReddit,
  IoSocialTwitter
} from 'react-icons/lib/io'

import trackEvent from '../helpers/track-event'

const Share = ({description, position, title, url, hackerNewsUrl, redditUrl}: Object) => {
  const encodedUrl = encodeURI(url)
  const encodedTitle = encodeURI(title)
  const encodedDescription = encodeURI(description)
  const className = 'inline-block white h6 ups flex items-center share-icon'
  const iconClassName = 'white'

  const handleClick = (network: string) => {
    if (url) {
      trackEvent({
        eventAction: `Clicked ${network} From ${position}`,
        eventCategory: 'Share',
        eventLabel: url
      })
      trackEvent({
        hitType: 'social',
        socialNetwork: network,
        socialAction: 'Share',
        socialTarget: url
      })
    }
  }

  const handleFacebookClick = () => handleClick('Facebook')
  const handleTwitterClick = () => handleClick('Twitter')
  const handleEmailClick = () => handleClick('Email')
  const handleHackerNewsClick = () => handleClick('HackerNews')
  const handleLinkedInClick = () => handleClick('LinkedIn')
  const handleRedditClick = () => handleClick('Reddit')

  return (
    <div className='my3 nowrap'>
      <div className='inline-block'>
        <a
          className={classNames([className, 'bg-fb-blue'])}
          href={url ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` : 'javascript:void(0)'}
          onClick={handleFacebookClick}
          rel='noopener noreferrer'
          target='_blank'
        >
          <FaFacebookOfficial className={iconClassName} />
          <span>{'Share'}</span>
        </a>
      </div>

      {hackerNewsUrl && (
        <div className='inline-block'>
          <a
            className={className}
            href={hackerNewsUrl}
            onClick={handleHackerNewsClick}
            rel='noopener noreferrer'
            style={{backgroundColor: '#ff6600'}}
            target='_blank'
          >
            <IoSocialHackernews className={iconClassName} />
            <span>{'Vote'}</span>
          </a>
        </div>
      )}

      {redditUrl && (
        <div className='inline-block'>
          <a
            className={className}
            href={redditUrl}
            onClick={handleRedditClick}
            rel='noopener noreferrer'
            style={{backgroundColor: '#FF5700'}}
            target='_blank'
          >
            <IoSocialReddit className={iconClassName} />
            <span className='xs-hide'>{'Vote'}</span>
          </a>
        </div>
      )}

      <div className='inline-block'>
        <a
          className={className}
          href={url ? `https://twitter.com/home?status=${encodedUrl}` : 'javascript:void(0)'}
          onClick={handleTwitterClick}
          rel='noopener noreferrer'
          style={{backgroundColor: '#0084b4'}}
          target='_blank'
        >
          <IoSocialTwitter className={iconClassName} />
        </a>
      </div>

      <div className='inline-block'>
        <a
          className={className}
          href={url ? `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}` : 'javascript:void(0)'}
          onClick={handleLinkedInClick}
          rel='noopener noreferrer'
          style={{backgroundColor: '#0077B5'}}
          target='_blank'
        >
          <IoSocialLinkedin className={iconClassName} />
        </a>
      </div>

      <div className='inline-block'>
        <a
          className={className}
          href={url ? `mailto:?&subject=${encodedTitle}&body=${encodedDescription}%0A${encodedUrl}` : 'javascript:void(0)'}
          onClick={handleEmailClick}
          rel='noopener noreferrer'
          style={{backgroundColor: '#738a8d'}}
          target='_blank'
        >
          <IoEmail className={iconClassName} />
        </a>
      </div>
    </div>
  )
}

export default Share
