// @flow

import isNode from 'detect-node'

export const getWordpressUrl = (path: string) => (
  isNode ? `http://wordpress/wp-json${path}` : `${window.location.origin}/wp-json${path}`
)

export const getFetchHeaders = ({authorize, cookiejar}: Object = {}) => {
  const headers: Object = {
    'Content-Type': 'application/json'
  }

  if (isNode) {
    headers['Host'] = global.HOST
  }

  if (authorize) {
    headers['Cookie'] = cookiejar

    const nonceMatch = cookiejar.match(/wp_rest_nonce=(.+?)(?:\s|$|;)/)
    if (nonceMatch) {
      headers['X-WP-Nonce'] = nonceMatch[1]
    }
  }

  return headers
}
