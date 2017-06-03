// @flow

import Axios from 'axios'
import isNode from 'detect-node'

const axios = Axios.create()

const getPublicApiHost = () => `api.${global.HOST}`
const getUrl = (path: string) => isNode ? `http://api:3001${path}` : `http://${getPublicApiHost()}${path}`

export default (opts: Object = {}) => {
  const path = typeof opts === 'string' ? opts : opts.path
  const method = opts.method || 'get'
  const url = getUrl(path)
  const data = opts.data
  const headers = {}

  if (isNode) {
    headers.host = getPublicApiHost()
  }
  if (opts.token) {
    headers.authorization = `JWT ${opts.token}`
  }

  console.log(`Fetching url: ${url}`)

  return axios.request({url, method, data, headers})
}

export {axios, getUrl}
