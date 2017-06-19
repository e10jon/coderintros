// @flow

export const getUrlObj = (postData: object) => ({
  pathname: '/post',
  query: {
    slug: postData.slug,
    type: `${postData.type}s`
  }
})

export function getFeaturedImageProps (postData: ?Object, {
  returnLargestSizeData,
  sizes = ['large', 'medium_large']
}: Object = {}): ?{
  alt: string,
  src: string,
  srcSet?: string
} {
  if (!postData) {
    return null
  }

  let imageData = postData._embedded &&
    postData._embedded['wp:featuredmedia'] &&
    postData._embedded['wp:featuredmedia'][0]

  if (!imageData) {
    return null
  }

  const sizesData = imageData.media_details.sizes

  const sortedSizes: Object = Object.keys(sizesData)
    .filter(k => sizes.includes(k))
    .sort((k1, k2) => sizesData[k2].width < sizesData[k1].width ? 0 : -1)
    .reduce((obj, size) => {
      obj[size] = sizesData[size]
      return obj
    }, {})

  const sizesKeys = Object.keys(sortedSizes)
  const smallestSizeKey = sizesKeys[0]
  const largerSizesKeys = sizesKeys.slice(1)

  if (returnLargestSizeData) {
    return sizesData[largerSizesKeys.length ? largerSizesKeys[largerSizesKeys.length - 1] : smallestSizeKey]
  }
  return {
    alt: imageData.alt_text,
    src: sizesData[smallestSizeKey].source_url,
    srcSet: largerSizesKeys.length ? largerSizesKeys
      .map(s => `${sortedSizes[s].source_url} ${sortedSizes[s].width}w`)
      .join(', ') : undefined
  }
}
