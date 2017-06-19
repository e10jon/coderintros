// @flow

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import PropTypes from 'prop-types'

import {getUrlObj} from '../helpers/post-data'

const Footer = (props: Object, {pagesData, siteData}: Object) => (
  <footer>
    <div className='max-width-3 mx-auto'>
      <div className='page-x-spacing center'>
        <div className='my3'>
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

        {siteData.github_repo_url ? (
          <div>
            <Head>
              <script
                async
                defer
                src='https://buttons.github.io/buttons.js'
              />
            </Head>

            <a
              aria-label={`Star ${siteData.github_repo_url} on Github`}
              className='github-button'
              data-show-count='true'
              data-size='large'
              href={siteData.github_repo_url}
            >
              {'Star'}
            </a>
          </div>
        ) : null}

        <div
          className='gray my3 h5 ups'
          dangerouslySetInnerHTML={{__html: `&copy;${moment().format('YYYY')} ${siteData.name}`}}
        />
      </div>
    </div>
  </footer>
)

Footer.contextTypes = {
  pagesData: PropTypes.array,
  siteData: PropTypes.object
}

export default Footer
