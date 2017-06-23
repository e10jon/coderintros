// @flow

import localForage from 'localforage'
import {action, observable} from 'mobx'
import { create, persist } from 'mobx-persist'
import 'isomorphic-fetch'

import {getWordpressUrl} from '../helpers/fetch'

// obtain using btoa(user:password)
const Authorization = 'Basic YXV0b21hdGVkOnBhc3N3b3Jk'

class Post {
  @persist @observable title = ''
  @persist('object') @observable _embedded = {}
}

class PostStore {
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
    this.post.title = e.target.innerHTML
  }
}

const hydrate = create({store: localForage})

export default function () {
  const postStore = new PostStore()
  hydrate('post', postStore)
  return postStore
}
