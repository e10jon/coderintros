// @flow

import React from 'react'
import {
  IoSocialFacebook as FacebookIcon,
  IoLink as PersonalIcon,
  IoSocialLinkedin as LinkedinIcon,
  IoSocialTwitter as TwitterIcon
} from 'react-icons/lib/io'

const createPrettyUrl = (url: string) => url
  .replace(/^https?:\/\/(?:www\.)?/i, '')
  .replace(/\/$/, '')

const LearnMore = ({postData}: Object) => {
  const aClassName = 'block sm-inline-block gray pb1 mr2'

  return (
    <div className='h4'>
      <div className='h3 muted mb2 mt1 line-height-3'>{`Learn more about ${postData.name}`}</div>

      <div>
        {postData.facebook_url && (
          <a
            className={aClassName}
            href={postData.facebook_url}
            rel='noopener noreferrer'
            target='_blank'
          >
            <FacebookIcon />
            <span className='px1 align-middle h5'>
              {createPrettyUrl(postData.facebook_url)}
            </span>
          </a>
        )}

        {postData.linkedin_url && (
          <a
            className={aClassName}
            href={postData.linkedin_url}
            rel='noopener noreferrer'
            target='_blank'
          >
            <LinkedinIcon />
            <span className='px1 align-middle h5'>
              {createPrettyUrl(postData.linkedin_url)}
            </span>
          </a>
        )}

        {postData.personal_url && (
          <a
            className={aClassName}
            href={postData.personal_url}
            rel='noopener noreferrer'
            target='_blank'
          >
            <PersonalIcon />
            <span className='px1 align-middle h5'>
              {createPrettyUrl(postData.personal_url)}
            </span>
          </a>
        )}

        {postData.twitter_url && (
          <a
            className={aClassName}
            href={postData.twitter_url}
            rel='noopener noreferrer'
            target='_blank'
          >
            <TwitterIcon />
            <span className='px1 align-middle h5'>
              {createPrettyUrl(postData.twitter_url)}
            </span>
          </a>
        )}
      </div>
    </div>
  )
}

export default LearnMore
