import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { resolve } from 'react-resolver'
import { bindActionCreators } from 'redux'

import { updateHeader } from 'store/ui'
import PostExcerpt from 'components/post-excerpt'
import SearchForm from 'components/search-form'
import { ArchiveLink, Post, Taxonomy } from 'helpers/wp-objects'
import WPRequest from 'helpers/wp-request'

export class Home extends Component {
  static propTypes = {
    homePageRes: PropTypes.shape().isRequired,
    stickyPostsRes: PropTypes.shape().isRequired,
    updateHeader: PropTypes.func.isRequired
  }

  static contextTypes = {
    categoriesRes: PropTypes.shape(),
    recentPostsRes: PropTypes.shape(),
    archivesLinksRes: PropTypes.shape()
  }

  componentWillMount () {
    this.updatePage(this.props, this.context)
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.homePageRes !== this.props.homePageRes || nextProps.stickyPostsRes !== this.props.stickyPostsRes) {
      this.updatePage(nextProps, nextContext)
    }
  }

  updatePage (props, context) {
    const { homePageRes, stickyPostsRes, updateHeader } = props
    const { categoriesRes, recentPostsRes, archivesLinksRes } = context

    this.categories = categoriesRes && categoriesRes.data ? categoriesRes.data.map(raw => new Taxonomy(raw)) : []
    this.home = new Post(homePageRes && homePageRes.data)
    this.recentPosts = recentPostsRes && recentPostsRes.data ? recentPostsRes.data.map(raw => new Post(raw)) : []
    this.stickyPosts = stickyPostsRes && stickyPostsRes.data ? stickyPostsRes.data.map(raw => new Post(raw)) : []
    this.archivesLinks = archivesLinksRes && archivesLinksRes.data ? archivesLinksRes.data.map(raw => new ArchiveLink(raw)) : []

    const featuredImage = this.home.featuredImage('large')

    updateHeader({
      title: this.home.title(),
      subtitle: this.home.subtitle(),
      titleTo: this.home.path(),
      imageSrc: featuredImage.src(),
      imageAlt: featuredImage.alt()
    })
  }

  render () {
    const sectionTitleClassName = 'h4 bold mb1'

    const ulClassName = 'list-reset mt0 mb3'
    const liClassName = 'nowrap ellipsis overflow-hidden'

    return (
      <div>
        <Helmet>
          <title>{'Home'}</title>
          <meta
            content={this.home.excerpt()}
            name='description'
          />
          {process.env.FB_APP_ID ? (
            <meta
              content={process.env.FB_APP_ID}
              property='fb:app_id'
            />
          ) : null}
          <meta
            content={this.home.link()}
            property='og:url'
          />
          <meta
            content='website'
            property='og:type'
          />
          <meta
            content={this.home.title()}
            property='og:title'
          />
          <meta
            content={this.home.subtitle()}
            property='og:description'
          />
          <meta
            content={this.home.featuredImage('large').src()}
            property='og:image'
          />
        </Helmet>

        <div className='flex flex-wrap max-width-3 mx-auto'>
          {this.home.content() ? (
            <div className='col-12 center px2'>
              <div
                className='my3'
                dangerouslySetInnerHTML={{__html: this.home.content()}}
              />
              <hr />
            </div>
          ) : null}

          <div className='col-12 md-col-8 p2'>
            {this.stickyPosts.map(post => (
              <PostExcerpt
                key={`HomeStickyPost${post.id()}`}
                post={post}
              />
            ))}
          </div>

          <div className='col-12 md-col-4 p2 xs-hide sm-hide'>
            <div className={sectionTitleClassName}>{'Recent Posts'}</div>
            <ul className={ulClassName}>
              {this.recentPosts.map(post => (
                <li
                  className={liClassName}
                  key={`HomeRecentPost${post.id()}`}
                >
                  <Link
                    dangerouslySetInnerHTML={{__html: post.title()}}
                    to={post.path()}
                  />
                </li>
              ))}
            </ul>

            <div className={sectionTitleClassName}>{'Categories'}</div>
            <ul className={ulClassName}>
              {this.categories.map(category => (
                <li
                  className={liClassName}
                  key={`HomeCategory${category.id()}`}
                >
                  <Link
                    dangerouslySetInnerHTML={{__html: category.name()}}
                    to={category.path()}
                  />
                </li>
              ))}
            </ul>

            <div className={sectionTitleClassName}>{'Archives'}</div>
            <ul className={ulClassName}>
              {this.archivesLinks.map(archivesLink => (
                <li
                  className={liClassName}
                  key={`HomeArchiveLink${archivesLink.id()}`}
                >
                  <Link
                    dangerouslySetInnerHTML={{__html: archivesLink.title()}}
                    to={archivesLink.path()}
                  />
                </li>
              ))}
            </ul>

            <div className={sectionTitleClassName}>{'Search'}</div>
            <ul className={ulClassName}>
              <li className={liClassName}>
                <SearchForm />
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const resolvers = {
  homePageRes: () => new WPRequest('/wp/v2/pages/?slug=home&_embed'),
  stickyPostsRes: () => new WPRequest('/wp/v2/posts?_embed&sticky=1')
}

const mapDispatchToProps = dispatch => bindActionCreators({ updateHeader }, dispatch)

export default resolve(resolvers)(connect(null, mapDispatchToProps)(Home))
