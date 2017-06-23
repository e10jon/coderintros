// @flow

import {action, observable} from 'mobx'
import 'isomorphic-fetch'

import {getWordpressUrl} from '../helpers/fetch'
import {getFeaturedImageProps} from '../helpers/post-data'

// obtain using btoa(user:password)
const Authorization = 'Basic YXV0b21hdGVkOnBhc3N3b3Jk'

export default class Post {
  @observable featuredImageProps = {}

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
    this.featuredImageProps = getFeaturedImageProps({
      _embedded: {'wp:featuredmedia': [json]}
    })
  }
}
