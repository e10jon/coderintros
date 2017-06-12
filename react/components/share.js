// @flow

import React from 'react'
import {
  IoEmail,
  IoSocialFacebook,
  IoSocialHackernews,
  IoSocialReddit,
  IoSocialTwitter
} from 'react-icons/lib/io'

const Share = ({title, url}: Object) => {
  const encodedUrl = encodeURI(url)
  const encodedTitle = encodeURI(title)
  const className = 'inline-block white h6 mb1 mr1 ups flex items-center p1'
  const iconClassName = 'share-icon white'

  return (
    <div className='my3'>
      <div className='inline-block'>
        <a
          className={className}
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          style={{backgroundColor: '#3b5998'}}
          target='_blank'
        >
          <IoSocialFacebook className={iconClassName} />
          <span>{'Share'}</span>
        </a>
      </div>

      <div className='inline-block'>
        <a
          className={className}
          href={`https://twitter.com/home?status=${encodedUrl}`}
          style={{backgroundColor: '#0084b4'}}
          target='_blank'
        >
          <IoSocialTwitter className={iconClassName} />
          <span>{'Tweet'}</span>
        </a>
      </div>

      <div className='inline-block'>
        <a
          className={className}
          href={`https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`}
          style={{backgroundColor: '#ff6600'}}
          target='_blank'
        >
          <IoSocialHackernews className={iconClassName} />
        </a>
      </div>

      <div className='inline-block'>
        <a
          className={className}
          href={`mailto:?&subject=You would like this page&body=Check%20out%20${encodedUrl}`}
          style={{backgroundColor: '#738a8d'}}
          target='_blank'
        >
          <IoEmail className={iconClassName} />
        </a>
      </div>

      <div className='inline-block'>
        <a
          className={className}
          href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
          style={{backgroundColor: '#FF5700'}}
          target='_blank'
        >
          <IoSocialReddit className={iconClassName} />
        </a>
      </div>
    </div>
  )
}

export default Share
