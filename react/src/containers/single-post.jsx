import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { context, resolve } from 'react-resolver'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { updateHeader } from 'store/ui'
import CommentForm from 'components/comment-form'
import CommentsList from 'components/comments-list'
import NotFound from 'containers/not-found'
import { Post } from 'helpers/wp-objects'
import WPRequest from 'helpers/wp-request'
import 'styles/single-post.scss'

class SinglePost extends Component {
  static propTypes = {
    postRes: PropTypes.shape().isRequired,
    updateHeader: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.updatePage(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.postRes !== this.props.postRes) {
      this.updatePage(nextProps)
    }
  }

  updatePage (props) {
    const { postRes, updateHeader } = props

    this.post = new Post(postRes && postRes.data)
    this.postContent = this.post.content()

    const byline = {}
    if (this.post.type() === 'post') {
      const profilePicture = this.post.author().profilePicture('thumbnail')
      byline.authorImageSrc = profilePicture.src()
      byline.authorImageAlt = profilePicture.alt()
      byline.authorName = this.post.author().name()
      byline.authorTo = this.post.author().path()
      byline.date = this.post.date()
    }

    const featuredImage = this.post.featuredImage('large')

    updateHeader({
      title: this.post.title(),
      titleTo: this.post.path(),
      imageSrc: featuredImage.src(),
      imageAlt: featuredImage.alt(),
      subtitle: this.post.subtitle(),
      byline
    })
  }

  render () {
    if (!this.post.exists()) {
      return <NotFound />
    }

    const categories = this.post.categories()
    const tags = this.post.tags()

    return (
      <div>
        <Helmet>
          <title>{this.post.title()}</title>
          <meta
            content={this.post.excerpt()}
            name='description'
          />
          {process.env.FB_APP_ID ? (
            <meta
              content={process.env.FB_APP_ID}
              property='fb:app_id'
            />
          ) : null}
          <meta
            content={this.post.link()}
            property='og:url'
          />
          <meta
            content='article'
            property='og:type'
          />
          <meta
            content={this.post.title()}
            property='og:title'
          />
          <meta
            content={this.post.subtitle()}
            property='og:description'
          />
          <meta
            content={this.post.featuredImage('large').src()}
            property='og:image'
          />
        </Helmet>

        <div className='px2 max-width-3 mx-auto'>
          <div
            className='wa-post-content'
            dangerouslySetInnerHTML={{__html: this.postContent}}
          />

          {categories.length || tags.length ? (
            <div>
              {categories.length ? (
                <div>
                  <hr />
                  <i className='fa fa-archive fa-fw' />
                  <span className='pl1'>{'Filed under'}</span>
                  {categories.map(category => (
                    <Link
                      className='pl1'
                      dangerouslySetInnerHTML={{__html: category.name()}}
                      key={`SinglePostCategory${category.id()}`}
                      to={category.path()}
                    />
                  ))}
                </div>
              ) : null}

              {tags.length ? (
                <div>
                  <i className='fa fa-tag fa-fw' />
                  <span className='pl1'>{'Tagged'}</span>
                  {tags.map(tag => (
                    <Link
                      className='pl1'
                      dangerouslySetInnerHTML={{__html: tag.name()}}
                      key={`SinglePostTag${tag.id()}`}
                      to={tag.path()}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {this.post.commentStatus() === 'open' ? (
            <div>
              <hr />
              <CommentForm postId={this.post.id()} />
              <CommentsList comments={this.post.comments()} />
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

const resolvers = {
  postRes: ({match: {params: {year, month, slug}}, location: {search}, cookie}) => {
    const config = {}
    let path

    if (/preview=true/.test(search)) {
      config.headers = {
        cookie,
        'X-WP-Nonce': cookie.match(/wp_rest_nonce=(.+?)(?:\s|$|;)/)[1],
        withCredentials: true
      }
      path = `/wp/v2/posts/${search.match(/preview_id=(\d+)/)[1]}/revisions?${search}`
    } else {
      path = `/wp/v2/${year && month ? 'posts' : 'pages'}?slug=${slug}&_embed`
    }

    return new WPRequest(path, config)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ updateHeader }, dispatch)

export default context('cookie')(resolve(resolvers)(connect(null, mapDispatchToProps)(SinglePost)))
