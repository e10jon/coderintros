import axios from 'axios'
import isNode from 'detect-node'

const requestCache = !isNode ? new Map() : null

export default class WPRequest {
  constructor (path, config = {}) {
    config.url = `${process.env.WORDPRESS_API_BASE}${path}`
    config.method = config.method || 'get'

    if (config.method === 'get' && requestCache && requestCache.has(path)) {
      return requestCache.get(path)
    } else {
      return axios(config)
        .then(({data}) => {
          const result = {data}
          if (requestCache) {
            requestCache.set(path, result)
          }
          return result
        })
        .catch(({data}) => ({err: data}))
    }
  }
}
