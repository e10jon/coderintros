// @flow

import React from 'react'
import {FaFacebookOfficial} from 'react-icons/lib/fa'
import {
  IoEmail,
  IoSocialHackernews,
  IoSocialReddit,
  IoSocialTwitter
} from 'react-icons/lib/io'

import trackEvent from '../helpers/track-event'

const Share = ({position, title, url, hackerNewsUrl, redditUrl}: Object) => {
  const encodedUrl = encodeURI(url)
  const encodedTitle = encodeURI(title)
  const className = 'inline-block white h6 ups flex items-center share-icon'
  const iconClassName = 'white'

  const handleClick = (network: string) => {
    trackEvent({
      eventCategory: 'Share',
      eventAction: `Clicked ${network} From ${position}`
    })
  }

  const handleFacebookClick = () => handleClick('Facebook')
  const handleTwitterClick = () => handleClick('Twitter')
  const handleEmailClick = () => handleClick('Email')
  const handleHackerNewsClick = () => handleClick('HackerNews')
  const handleRedditClick = () => handleClick('Reddit')

  return (
    <div className='my3'>
      <div className='inline-block'>
        <a
          className={`${className} bg-fb-blue`}
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          onClick={handleFacebookClick}
          rel='noopener noreferrer'
          target='_blank'
        >
          <FaFacebookOfficial className={iconClassName} />
          <span>{'Share'}</span>
        </a>
      </div>

      <div className='inline-block'>
        <a
          className={className}
          href={`https://twitter.com/home?status=${encodedUrl}`}
          onClick={handleTwitterClick}
          rel='noopener noreferrer'
          style={{backgroundColor: '#0084b4'}}
          target='_blank'
        >
          <IoSocialTwitter className={iconClassName} />
          <span className='xs-hide'>{'Tweet'}</span>
        </a>
      </div>

      <div className='inline-block'>
        <a
          className={className}
          href={`mailto:?&subject=You would like this page&body=Check%20out%20${encodedUrl}`}
          onClick={handleEmailClick}
          rel='noopener noreferrer'
          style={{backgroundColor: '#738a8d'}}
          target='_blank'
        >
          <IoEmail className={iconClassName} />
          <span className='xs-hide'>{'Email '}</span>
        </a>
      </div>

      {hackerNewsUrl ? (
        <div className='inline-block'>
          <a
            className={className}
            href={`https://news.ycombinator.com/submitlink?u=${encodeURI(hackerNewsUrl)}&t=${encodedTitle}`}
            onClick={handleHackerNewsClick}
            rel='noopener noreferrer'
            style={{backgroundColor: '#ff6600'}}
            target='_blank'
          >
            <IoSocialHackernews className={iconClassName} />
            <span>{'Vote'}</span>
          </a>
        </div>
      ) : null}

      {redditUrl ? (
        <div className='inline-block'>
          <a
            className={className}
            href={`https://www.reddit.com/submit?url=${encodeURI(redditUrl)}&title=${encodedTitle}`}
            onClick={handleRedditClick}
            rel='noopener noreferrer'
            style={{backgroundColor: '#FF5700'}}
            target='_blank'
          >
            <IoSocialReddit className={iconClassName} />
            <span className='xs-hide'>{'Vote'}</span>
          </a>
        </div>
      ) : null}
    </div>
  )
}

export default Share
