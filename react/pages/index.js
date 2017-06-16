// @flow

import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import stripTags from 'striptags'

import createPage, {pageXSpacing} from '../helpers/create-page'
import {getFeaturedImageProps} from '../helpers/post-data'
import Link from '../helpers/link'

const Home = ({postsData}: Object, {siteData}: Object) => {
  return (
    <div className={pageXSpacing}>
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

      <hr className='mt3 mb3 sm-mb4 xs-hide ' />

      {postsData.map(postData => (
        <Link
          className='flex flex-wrap items-center my2 sm-my3'
          href={postData.link}
          key={`Post${postData.id}`}
        >
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
            </div>
          </div>
        </Link>
      ))}
    </div>
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
