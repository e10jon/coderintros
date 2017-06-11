// @flow

import React from 'react'
import NextLink from 'next/link'
import URL from 'url'

// by creating our own Link function, we can easily switch from hard <a> links
// to soft <Link> tags, because of uncertainty in our analytics abilities
const useHardLinks = false

const relativePath = href => {
  const urlObj: Object = URL.parse(href)
  return `${urlObj.pathname}${urlObj.query || ''}`
}

export default function Link ({children, className, dangerouslySetInnerHTML, href, nextPath}: Object = {}) {
  const aProps: Object = {className}

  if (children) {
    aProps.children = children
  } else if (dangerouslySetInnerHTML) {
    aProps.dangerouslySetInnerHTML = dangerouslySetInnerHTML
  }

  if (useHardLinks) {
    return (
      <a
        href={href}
        {...aProps}
      />
    )
  } else {
    return (
      <NextLink
        as={relativePath(href)}
        href={nextPath}
      >
        <a {...aProps} />
      </NextLink>
    )
  }
}
