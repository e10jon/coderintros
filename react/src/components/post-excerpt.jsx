import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import defaultImgSrc from 'images/default.jpg'
import Byline from 'components/byline'
import { Post } from 'helpers/wp-objects'

import 'styles/post-excerpt.scss'

const PostExcerpt = props => {
  const { post } = props

  const authorPicture = post.author().profilePicture('thumbnail')
  const featuredImage = post.featuredImage('medium')

  return (
    <div className='flex flex-wrap mxn1 mb2'>
      <div className='col-12 sm-col-5 px1'>
        <Link to={post.path()}>
          <img
            alt={featuredImage.alt()}
            className='col-12 block mb1'
            src={featuredImage.src() || defaultImgSrc}
          />
        </Link>
      </div>

      <div className='col-12 sm-col-7 px1'>
        <h3 className='mt0 mb1'>
          <Link
            dangerouslySetInnerHTML={{__html: post.title()}}
            to={post.path()}
          />
        </h3>

        <div
          className='mb2 wa-post-excerpt'
          dangerouslySetInnerHTML={{__html: post.excerpt()}}
        />

        <div className='h6 uppercase mb2'>
          <Byline
            authorImageAlt={authorPicture.alt()}
            authorImageSrc={authorPicture.src()}
            authorName={post.author().name()}
            authorTo={post.author().path()}
            date={post.date()}
          />
        </div>
      </div>
    </div>
  )
}

PostExcerpt.propTypes = {
  post: PropTypes.instanceOf(Post).isRequired
}

export default PostExcerpt
