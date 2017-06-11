// @flow

import React from 'react'

const Share = ({title, url}: Object) => {
  const encodedUrl = encodeURI(url)
  const encodedTitle = encodeURI(title)
  const className = 'border inline-block py1 px2 h6 mb1 mr1 ups bold'

  return (
    <div className='my3'>
      <a
        className={className}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        style={{color: '#3b5998'}}
      >
        {'Post to FB'}
      </a>

      <a
        className={className}
        href={`https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`}
        style={{color: '#ff6600'}}
      >
        {'Post to HN'}
      </a>

      <a
        className={className}
        href={`https://twitter.com/home?status=${encodedUrl}`}
        style={{color: '#0084b4'}}
      >
        {'Tweet'}
      </a>

      <a
        className={className}
        href={`mailto:?&subject=You would like this page&body=Check%20out%20${encodedUrl}`}
        style={{color: '#738a8d'}}
      >
        {'Send email'}
      </a>

      <a
        className={className}
        href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
        style={{color: '#FF5700'}}
      >
        {'Post to Reddit'}
      </a>
    </div>
  )
}

export default Share
