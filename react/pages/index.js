// @flow

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import PropTypes from 'prop-types'
import stripTags from 'striptags'

import createPage from '../helpers/create-page'
import {getUrlObj, getFeaturedImageProps} from '../helpers/post-data'

const Home = ({postsData}: Object, {siteData}: Object) => {
  return (
    <main>
      <Head>
        <title>{siteData.name}</title>

        <meta
          content={siteData.description}
          name='description'
        />

        <meta
          content='website'
          property='og:type'
        />
        <meta
          content={siteData.home}
          property='og:url'
        />
        <meta
          content={siteData.name}
          property='og:title'
        />
        <meta
          content={siteData.description}
          property='og:description'
        />
        <meta
          content={siteData.images.og}
          property='og:image'
        />
      </Head>

      <div className='max-width-4 mx-auto'>
        <div className='page-x-spacing'>
          <hr className='mt3 mb3 sm-mb4 xs-hide' />

          <div className='max-width-3 mx-auto'>
            {postsData.map(postData => (
              <Link
                as={postData.link}
                href={getUrlObj(postData)}
                key={`Post${postData.id}`}
              >
                <a className='flex flex-wrap items-center mb2 sm-mb3'>
                  <div className='col-12 sm-col-4'>
                    <img
                      className='block fit bg-gray'
                      {...getFeaturedImageProps(postData, {sizes: ['medium', 'thumbnail']})}
                    />
                  </div>

                  <div className='col-12 sm-col-8'>
                    <div className='my2 sm-ml3'>
                      <h2 className='my2 lora h1 line-height-3'>{postData.title.rendered}</h2>

                      <div
                        className='my2 gray italic'
                        dangerouslySetInnerHTML={{__html: stripTags(postData.excerpt.rendered)}}
                      />

                      <div className='my2 gray'>{moment(postData.date).format('MMMM D, YYYY')}</div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>

          <hr className='mt3 mb3 sm-mt4' />
        </div>
      </div>
    </main>
  )
}

Home.displayName = 'Home'

Home.contextTypes = {
  siteData: PropTypes.object
}

export default createPage(Home, {
  propPaths: () => ({
    postsData: '/wp/v2/posts?_embed'
  })
})
