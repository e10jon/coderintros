// @flow

import React from 'react'

// enable to show a placeholder image
// useful for development purposes
const showDefaultImage = process.env.NODE_ENV !== 'production'

export function featuredImage (postData: Object, {
  className = 'block fit bg-gray',
  returnLargestSizeData,
  style
}: Object = {}): ?Object {
  let imageData = postData._embedded &&
    postData._embedded['wp:featuredmedia'] &&
    postData._embedded['wp:featuredmedia'][0]

  if (!imageData && showDefaultImage) {
    imageData = {
      alt_text: 'default',
      media_details: {
        sizes: {
          thumbnail: {
            height: 1200,
            source_url: '/static/img/default.svg',
            width: 1200
          }
        }
      }
    }
  } else if (!imageData) {
    return null
  }

  const sizesData = imageData.media_details.sizes

  // sort from smallest to largest
  const sizes: Object = Object.keys(sizesData)
    .sort((k1, k2) => sizesData[k2].width < sizesData[k1].width ? 0 : -1)
    .reduce((obj, size) => {
      obj[size] = sizesData[size]
      return obj
    }, {})

  const sizesKeys = Object.keys(sizes)

  const srcSet = sizesKeys
    .filter(k => !['thumbnail', 'full'].includes(k))
    .map(s => `${sizes[s].source_url} ${sizes[s].width}w`)
    .join(', ')

  if (returnLargestSizeData) {
    return sizesData[sizesKeys.filter(k => k !== 'full').reverse()[0]]
  } else {
    return (
      <img
        alt={imageData.alt_text}
        className={className}
        src={sizesData.thumbnail.source_url}
        srcSet={srcSet}
        style={style}
      />
    )
  }
}

export function getLargestSizeData (postData: Object): ?Object {
  return featuredImage(postData, {returnLargestSizeData: true})
}
