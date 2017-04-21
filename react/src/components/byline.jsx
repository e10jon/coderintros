import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import 'styles/byline.scss'

const Byline = props => {
  const { authorImageSrc, authorImageAlt, authorTo, authorName, color, date } = props

  return (
    <span>
      {authorImageSrc ? (
        <span className='pr1 align-middle inline-block'>
          <img
            alt={authorImageAlt}
            className='circle align-middle wa-byline-img'
            src={authorImageSrc}
          />
        </span>
      ) : null}

      <Link
        className={color}
        to={authorTo}
      >
        <span>{'By '}</span>
        <span className='bold uppercase'>{authorName}</span>
      </Link>
      <span
        className={`${color} pl1`}
        dangerouslySetInnerHTML={{__html: date}}
      />
    </span>
  )
}

Byline.defaultProps = {
  authorImageAlt: '',
  authorImageSrc: '',
  authorName: '',
  authorTo: '/',
  color: 'black',
  date: ''
}

Byline.propTypes = {
  authorImageAlt: PropTypes.string,
  authorImageSrc: PropTypes.string,
  authorName: PropTypes.string,
  authorTo: PropTypes.string,
  color: PropTypes.oneOf(['black', 'white']),
  date: PropTypes.string
}

export default Byline
