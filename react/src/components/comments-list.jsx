import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Comment } from 'helpers/wp-objects'

const CommentsList = (props, context) => {
  const { comments } = props

  return (
    <div>
      <div className='h3 mb2'>{`${comments.length} Replies`}</div>
      {comments.map(comment => (
        <div
          id={`comment-${comment.id()}`}
          key={`CommentsList${comment.id()}`}
        >
          <div
            className='bold'
            dangerouslySetInnerHTML={{__html: comment.authorName()}}
          />
          <div className='h6'>
            <Link to={comment.path()}>{comment.date()}</Link>
          </div>
          <div dangerouslySetInnerHTML={{__html: comment.content()}} />
        </div>
      ))}
    </div>
  )
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.instanceOf(Comment))
}

CommentsList.defaultProps = {
  comments: []
}

export default CommentsList
