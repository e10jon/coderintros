// @flow

import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import stripTags from 'striptags'

import createPage from '../helpers/create-page'
import {featuredImage} from '../helpers/post-data'
import Link from '../helpers/link'

const Home = ({postsData}: Object, {siteData}: Object) => {
  return (
    <div>
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
          content='/static/img/og.png'
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
            {featuredImage(postData, {size: 'medium_large'})}
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
