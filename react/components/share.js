// @flow

import React from 'react'
import Head from 'next/head'
import {FaFacebookOfficial} from 'react-icons/lib/fa'
import {
  IoEmail,
  IoSocialHackernews,
  IoSocialReddit,
  IoSocialTwitter
} from 'react-icons/lib/io'

import styles from '../styles/components/share.scss'
import trackEvent from '../helpers/track-event'

const Share = ({position, title, url, hackerNewsUrl, redditUrl}: Object) => {
  const encodedUrl = encodeURI(url)
  const encodedTitle = encodeURI(title)
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
  const handleRedditClick = () => handleClick('Reddit')

  return (
    <div className='my3 nowrap'>
      <Head>
        <style dangerouslySetInnerHTML={{__html: styles}} />
      </Head>

      <div className='inline-block'>
        <a
          className={`${className} bg-fb-blue`}
          href={url ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` : 'javascript:void(0)'}
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
          href={url ? `https://twitter.com/home?status=${encodedUrl}` : 'javascript:void(0)'}
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
          href={url ? `mailto:?&subject=You would like this page&body=Check%20out%20${encodedUrl}` : 'javascript:void(0)'}
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
            href={url ? `https://news.ycombinator.com/submitlink?u=${encodeURI(hackerNewsUrl)}&t=${encodedTitle}` : 'javascript:void(0)'}
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
            href={url ? `https://www.reddit.com/submit?url=${encodeURI(redditUrl)}&title=${encodedTitle}` : 'javascript:void(0)'}
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
