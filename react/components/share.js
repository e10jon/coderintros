// @flow

import React from 'react'

const Share = ({title, url}: Object) => {
  const encodedUrl = encodeURI(url)
  const encodedTitle = encodeURI(title)
  const className = 'white inline-block py1 px2 h6 mb1 ups bold'

  return (
    <div className='my3'>
      <a
        className={className}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        style={{backgroundColor: '#3b5998'}}
      >
        {'Post to FB'}
      </a>

      <a
        className={className}
        href={`https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`}
        style={{backgroundColor: '#ff6600'}}
      >
        {'Post to HN'}
      </a>

      <a
        className={className}
        href={`https://twitter.com/home?status=${encodedUrl}`}
        style={{backgroundColor: '#0084b4'}}
      >
        {'Tweet'}
      </a>

      <a
        className={className}
        href={`mailto:?&subject=You would like this page&body=Check%20out%20${encodedUrl}`}
        style={{backgroundColor: '#738a8d'}}
      >
        {'Send email'}
      </a>

      <a
        className={className}
        href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
        style={{backgroundColor: '#FF5700'}}
      >
        {'Post to Reddit'}
      </a>
    </div>
  )
}

export default Share
