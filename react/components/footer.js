// @flow

import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import PropTypes from 'prop-types'
import {IoEmail as EmailIcon, IoSocialGithub as GithubIcon} from 'react-icons/lib/io'

import {getUrlObj} from '../helpers/post-data'

const Footer = (props: Object, {pagesData, siteData}: Object) => (
  <footer className='py2 sm-py3 center'>
    <div className='mb1'>
      {pagesData && pagesData.map(p => (
        <Link
          as={p.link}
          href={getUrlObj(p)}
          key={`HeaderPage${p.id}`}
        >
          <a
            className='inline-block p1 ups gray h5'
            dangerouslySetInnerHTML={{__html: p.title.rendered}}
          />
        </Link>
      ))}
    </div>

    <div className='mb2'>
      {siteData.github_repo_url && (
        <a
          className='gray p1 h5 inline-block'
          href={siteData.github_repo_url}
          rel='noopener noreferrer'
          target='_blank'
        >
          <GithubIcon />
          <span className='pl1 align-middle'>{'Github'}</span>
        </a>
      )}

      {siteData.public_email && (
        <a
          className='gray p1 h5 inline-block'
          href={`mailto:${siteData.public_email}`}
          rel='noopener noreferrer'
          target='_blank'
        >
          <EmailIcon />
          <span className='pl1 align-middle'>{'Email'}</span>
        </a>
      )}
    </div>

    <div
      className='gray my2 h5'
      dangerouslySetInnerHTML={{__html: `&copy;${moment().format('YYYY')} ${siteData.name}`}}
    />
  </footer>
)

Footer.contextTypes = {
  pagesData: PropTypes.array,
  siteData: PropTypes.object
}

export default Footer
