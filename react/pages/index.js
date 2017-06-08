// @flow

import React from 'react'
import moment from 'moment'

import createPage from '../components/page'
import Link from '../helpers/link'

const Home = ({postsData}) => {
  return (
    <div>
      {postsData.map(postData => (
        <Link
          className='flex flex-wrap items-center'
          href={postData.link}
          key={`Post${postData.id}`}
        >
          <div className='col-12 md-col-4'>
            <img
              alt={postData._embedded && postData._embedded['wp:featuredmedia'] ? postData._embedded['wp:featuredmedia'][0].alt_text : ''}
              className='block fit bg-gray'
              src={postData._embedded && postData._embedded['wp:featuredmedia'] ? postData._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url : '/static/img/default.svg'}
            />
          </div>

          <div className='col-12 md-col-8'>
            <div className='my2 md-mx2'>
              <h1>{postData.title.rendered}</h1>
              <div
                className='my1 gray'
                dangerouslySetInnerHTML={{__html: postData.excerpt.rendered}}
              />
              <div className='my1 h5 gray'>{moment(postData.date).format('MMMM D, YYYY')}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

Home.displayName = 'Home'

export default createPage(Home, {
  propPaths: () => ({
    postsData: '/wp/v2/posts'
  })
})
