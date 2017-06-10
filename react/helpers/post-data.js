// @flow

import React from 'react'

export function featuredImage (postData: Object, {className = 'block fit bg-gray', style}: Object) {
  let imageData = postData._embedded &&
    postData._embedded['wp:featuredmedia'] &&
    postData._embedded['wp:featuredmedia'][0]

  if (!imageData) {
    imageData = {
      alt_text: 'default',
      media_details: {
        sizes: {
          default: {
            height: 1200,
            source_url: '/static/img/default.svg',
            width: 1200
          }
        }
      }
    }
  }

  const sizesData = imageData.media_details.sizes

  // sort from smallest to largest
  const sizes: Object = Object.keys(sizesData)
    .sort((k1, k2) => sizesData[k2].width < sizesData[k1].width)
    .reduce((obj, size) => {
      obj[size] = sizesData[size]
      return obj
    }, {})

  const sizesKeys = Object.keys(sizes)

  const srcSet = sizesKeys
    .map(s => `${sizes[s].source_url} ${sizes[s].width}w`)
    .join(', ')

  const largestSize = sizes[sizesKeys[sizesKeys.length - 1]]

  return (
    <img
      alt={imageData.alt_text}
      className={className}
      src={largestSize.url}
      srcSet={srcSet}
      style={style}
    />
  )
}
