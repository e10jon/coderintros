// @flow

import React from 'react'

const Share = ({url}: Object) => {
  const encodedUrl = encodeURI(url)
  const className = 'bg-silver inline-block py1 px2 h6 mr1'

  return (
    <div className='my3 sm-my4'>
      <a
        className={className}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
      >
        {'Facebook'}
      </a>

      <a
        className={className}
        href={`https://twitter.com/home?status=${encodedUrl}`}
      >
        {'Tweet'}
      </a>

      <a
        className={className}
        href={`mailto:?&subject=You would like this page&body=Check%20out%20${encodedUrl}`}
      >
        {'Email'}
      </a>
    </div>
  )
}

export default Share
