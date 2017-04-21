import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { resolve } from 'react-resolver'
import { bindActionCreators } from 'redux'
import dateFormat from 'date-fns/format'

import { updateHeader } from 'store/ui'
import PostExcerpt from 'components/post-excerpt'
import { Taxonomy, Post, User } from 'helpers/wp-objects'
import WPRequest from 'helpers/wp-request'

const isCategoryPage = url => /\/category\//.test(url)
const isTagPage = url => /\/tag\//.test(url)
const isAuthorPage = url => /\/author\//.test(url)

const createEntity = (url, data) => {
  let Entity
  if (isCategoryPage(url)) Entity = Taxonomy
  else if (isTagPage(url)) Entity = Taxonomy
  else if (isAuthorPage(url)) Entity = User
  return new Entity(data)
}

const getSearchTerm = search => search.match(/\?s=(.+)?(&|$)/)[1]

export class Archive extends Component {
  static propTypes = {
    entityRes: PropTypes.shape(),
    location: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
    postsRes: PropTypes.shape().isRequired,
    updateHeader: PropTypes.func.isRequired
  }

  static defaultProps = {
    entityRes: null
  }

  componentWillMount () {
    this.updatePage(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.entityRes !== this.props.entityRes || nextProps.postsRes !== this.props.postsRes) {
      this.updatePage(nextProps)
    }
  }

  updatePage (props) {
    const { entityRes, postsRes, updateHeader, location: {search}, match: {url, params: {year, month}} } = props

    if (entityRes) {
      this.entity = createEntity(url, entityRes && entityRes.data)
      if (isTagPage(url)) {
        updateHeader({
          title: this.entity.name(),
          titleTo: this.entity.path(),
          subtitle: `Posts tagged &ldquo;${this.entity.name()}&rdquo;`
        })
      } else if (isCategoryPage(url)) {
        updateHeader({
          title: this.entity.name(),
          titleTo: this.entity.path(),
          subtitle: `Posts categorized &ldquo;${this.entity.name()}&rdquo;`
        })
      } else if (isAuthorPage(url)) {
        const profilePicture = this.entity.profilePicture('large')

        updateHeader({
          title: this.entity.name(),
          titleTo: this.entity.path(),
          imageSrc: profilePicture.src(),
          imageAlt: profilePicture.alt(),
          subtitle: this.entity.description(),
          link: this.entity.url()
        })
      }
    } else if (year || month) {
      updateHeader({
        title: 'Archives',
        subtitle: `Posts since ${dateFormat(`${year}-${month || '01'}-01`, 'MMM YYYY')}`
      })
    } else if (search) {
      updateHeader({
        title: getSearchTerm(search),
        titleTo: `/${search}`,
        subtitle: `Posts matching &ldquo;${getSearchTerm(search)}&rdquo;`
      })
    }

    this.posts = postsRes && postsRes.data ? postsRes.data.map(raw => new Post(raw)) : []
  }

  render () {
    return (
      <div>
        <Helmet>
          <title>{'Archive'}</title>
          <meta
            content={this.entity ? this.entity.description() : ''}
            name='description'
          />
          {process.env.FB_APP_ID ? (
            <meta
              content={process.env.FB_APP_ID}
              property='fb:app_id'
            />
          ) : null}
          <meta
            content={this.entity ? this.entity.link() : ''}
            property='og:url'
          />
          <meta
            content='website'
            property='og:type'
          />
          <meta
            content={this.entity ? this.entity.name() : ''}
            property='og:title'
          />
          <meta
            content={this.entity ? this.entity.description() : ''}
            property='og:description'
          />
          <meta
            content={this.entity && this.entity.profilePicture ? this.entity.profilePicture('large').src : ''}
            property='og:image'
          />
        </Helmet>

        <div className='max-width-3 mx-auto p2'>
          {this.posts.map(post => (
            <PostExcerpt
              key={post.id()}
              post={post}
            />
          ))}
        </div>
      </div>
    )
  }
}

const resolvers = [{
  entityRes: ({match: {params: {slug}, url}}) => {
    let entityPath
    if (isCategoryPage(url)) entityPath = 'categories'
    else if (isTagPage(url)) entityPath = 'tags'
    else if (isAuthorPage(url)) entityPath = 'users'
    if (entityPath) {
      return new WPRequest(`/wp/v2/${entityPath}?slug=${slug}`)
    }
  }
}, {
  postsRes: ({entityRes, match: {url, params: {year, month}}, location: {search}}) => {
    let entityParam, entityValue
    if (entityRes) {
      if (isCategoryPage(url)) entityParam = 'categories'
      else if (isTagPage(url)) entityParam = 'tags'
      else if (isAuthorPage(url)) entityParam = 'author'
      const entity = createEntity(url, entityRes && entityRes.data)
      entityValue = entity.id()
    } else if (search) {
      entityParam = 'search'
      entityValue = getSearchTerm(search)
    } else if (year || month) {
      entityParam = 'after'
      entityValue = `${year}-${month || '01'}-01T00:00:00.000Z`
    }
    if (entityParam && entityValue) {
      return new WPRequest(`/wp/v2/posts?${entityParam}=${entityValue}&_embed`)
    }
  }
}]

const mapDispatchToProps = dispatch => bindActionCreators({ updateHeader }, dispatch)

export default resolve(resolvers[0])(resolve(resolvers[1])(connect(null, mapDispatchToProps)(Archive)))
