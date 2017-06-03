// @flow

import Axios from 'axios'
import isNode from 'detect-node'

const axios = Axios.create()

export default (opts: Object = {}) => {
  const path = typeof opts === 'string' ? opts : opts.path
  const method = opts.method || 'get'
  const url = isNode ? `http://wordpress/wp-json/wp/v2${path}` : path
  const data = opts.data

  const headers = {
    host: global.HOST
  }

  console.log(`Fetching url: ${url}`)

  return axios.request({
    data,
    headers,
    method,
    url
  })
}
