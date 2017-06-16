// @flow

import Axios from 'axios'
import isNode from 'detect-node'

const axios = Axios.create()

export default (opts: Object = {}) => {
  const path = typeof opts === 'string' ? opts : opts.path
  const method = opts.method || 'get'
  const url = isNode ? `http://wordpress/wp-json${path}` : `/wp-json${path}`
  const data = opts.data
  const restNonce = opts.cookiejar ? opts.cookiejar.match(/wp_rest_nonce=(.+?)(?:\s|$|;)/)[1] : undefined
  const headers = opts.headers || {}

  if (isNode) {
    headers.host = global.HOST
  }

  if (restNonce) {
    headers.cookie = opts.cookiejar
    headers['X-WP-Nonce'] = restNonce
    headers.withCredentials = true
  }

  return axios.request({
    data,
    headers,
    method,
    url
  })
}
