// @flow

import {action, observable} from 'mobx'
import {persist} from 'mobx-persist'
import 'isomorphic-fetch'

import {getWordpressUrl} from '../helpers/fetch'

// obtain using btoa(user:password)
const Authorization = 'Basic YXV0b21hdGVkOnBhc3N3b3Jk'

class Post {
  @persist('object') @observable content = {rendered: ''}
  @persist('object') @observable excerpt = {rendered: ''}
  @persist('object') @observable title = {rendered: ''}
  @persist('object') @observable _embedded = {'wp:featuredmedia': []}
  @persist('object') @observable _formatting = {}
  @persist('object') @observable _social_links = {}
}

export default class PostStore {
  @persist('object', Post) @observable post = new Post()

  @action handleFeaturedImageDrop = async (files: Array<?Object> = []) => {
    const photoFormData = new global.FormData()
    photoFormData.append('file', files[0])

    const res = await global.fetch(getWordpressUrl('/wp/v2/media'), {
      body: photoFormData,
      headers: {Authorization},
      method: 'POST'
    })
    const json = await res.json()

    // have to adjust the input a little bit so it looks like a regular post
    this.post._embedded['wp:featuredmedia'] = [json]
  }

  @action handleTitleChange = (e: Object) => {
    this.post.title.rendered = e.target.innerHTML
  }
}
