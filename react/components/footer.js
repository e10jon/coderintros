// @flow

import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import PropTypes from 'prop-types'
import {IoSocialGithub} from 'react-icons/lib/io'

import {getUrlObj} from '../helpers/post-data'

const Footer = (props: Object, {pagesData, siteData}: Object) => (
  <footer>
    <div className='max-width-3 mx-auto'>
      <div className='page-x-spacing center'>
        <div className='my2'>
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

        <div
          className='gray my2 h5 ups'
          dangerouslySetInnerHTML={{__html: `&copy;${moment().format('YYYY')} ${siteData.name}`}}
        />

        {siteData.github_repo_url ? (
          <div className='my2'>
            <a
              className='gray p1 h5 ups inline-block'
              href={siteData.github_repo_url}
            >
              <IoSocialGithub />
              <span className='pl1 align-middle'>{'Github'}</span>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  </footer>
)

Footer.contextTypes = {
  pagesData: PropTypes.array,
  siteData: PropTypes.object
}

export default Footer
