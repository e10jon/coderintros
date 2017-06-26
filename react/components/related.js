// @flow

import React, {PureComponent} from 'react'
import {observer} from 'mobx-react'
import Link from 'next/link'
import 'isomorphic-fetch'

import {getFetchHeaders, getWordpressUrl} from '../helpers/fetch'
import {getUrlObj, getFeaturedImageProps} from '../helpers/post-data'
import RelatedStore from '../stores/related'

@observer
class Related extends PureComponent {
  componentWillMount () {
    this.store = new RelatedStore()
  }

  componentDidMount () {
    this.loadRelatedPosts()
  }

  async loadRelatedPosts () {
    const res = await global.fetch(getWordpressUrl(`/wp/v2/posts?more_like=${this.props.postData.id}&per_page=4&_embed`), {
      headers: getFetchHeaders()
    })
    const json = await res.json()
    this.store.postsData = json
  }

  props: {
    postData: Object
  }
  store: Object

  render () {
    if (!this.store.postsData.length) {
      return null
    }

    return (
      <div className='page-x-spacing'>
        <hr className='my2' />

        <div className='h3 my2 gray'>{'Related Profiles'}</div>

        <div className='flex flex-wrap my2 mxn1'>
          {this.store.postsData.map((postData, i) => (
            <Link
              as={postData.link}
              href={getUrlObj(postData)}
              key={`Related${postData.id}`}
            >
              <a className={`col-4 sm-col-3 block px1 ${i === 3 ? 'xs-hide' : ''}`}>
                <img
                  className='block fit col-12'
                  {...getFeaturedImageProps(postData, {sizes: ['medium', 'thumbnail']})}
                />
                <h4 className='my1'>{postData.title.rendered}</h4>
              </a>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default Related
