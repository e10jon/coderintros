import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { updateUI } from 'store/ui'
import SearchForm from 'components/search-form'
import { ArchiveLink, Post, Taxonomy } from 'helpers/wp-objects'
import 'styles/mobile-menu.scss'

class MobileMenu extends Component {
  static contextTypes = {
    pagesRes: PropTypes.shape(),
    categoriesRes: PropTypes.shape(),
    recentPostsRes: PropTypes.shape(),
    archivesLinksRes: PropTypes.shape(),
    router: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.node,
    ui: PropTypes.shape().isRequired,
    updateUI: PropTypes.func.isRequired
  }

  static defaultProps = {
    children: null
  }

  componentWillMount () {
    const { categoriesRes, pagesRes, recentPostsRes, archivesLinksRes } = this.context

    this.pages = pagesRes && pagesRes.data ? pagesRes.data.map(raw => new Post(raw)) : []
    this.categories = categoriesRes && categoriesRes.data ? categoriesRes.data.map(raw => new Taxonomy(raw)) : []
    this.recentPosts = recentPostsRes && recentPostsRes.data ? recentPostsRes.data.map(raw => new Post(raw)) : []
    this.archivesLinks = archivesLinksRes && archivesLinksRes.data ? archivesLinksRes.data.map(raw => new ArchiveLink(raw)) : []
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (this.props.ui.isMobileMenuShown && this.context.router.route.location !== nextContext.router.route.location) {
      this.props.updateUI({isMobileMenuShown: false})
    }
  }

  handleClick = (e) => {
    if (this.props.ui.isMobileMenuShown && !this.mobileMenuNode.contains(e.target)) {
      this.props.updateUI({isMobileMenuShown: false})
    }
  }

  render () {
    const { ui, children } = this.props
    const { isMobileMenuShown } = ui

    const ulClassName = 'list-reset p0 mt0 mb3'
    const linkClassName = 'white uppercase h5'
    const liClassName = 'mb1 nowrap white ellipsis overflow-hidden'

    return (
      <div onClick={this.handleClick}>
        <div className={`flex flex-column justify-between min-height-100vh wa-mobile-menu-app ${!isMobileMenuShown ? 'shown' : 'hidden'}`}>
          {children}
        </div>

        <div
          className={`md-hide lg-hide bg-black min-height-100-vh fixed top-0 right-0 bottom-0 left-0 py2 px3 wa-mobile-menu ${isMobileMenuShown ? 'shown' : 'hidden'}`}
          ref={r => { this.mobileMenuNode = r }}
        >
          <ul className={ulClassName}>
            {this.pages.map(page => (
              <li
                className={liClassName}
                key={page.id()}
              >
                <Link
                  className={linkClassName}
                  dangerouslySetInnerHTML={{__html: page.navTitle()}}
                  to={page.path()}
                />
              </li>
            ))}
          </ul>
          <hr />

          <ul className={ulClassName}>
            {this.recentPosts.map(post => (
              <li
                className={liClassName}
                key={post.id()}
              >
                <Link
                  className={linkClassName}
                  dangerouslySetInnerHTML={{__html: post.title()}}
                  to={post.path()}
                />
              </li>
            ))}
          </ul>
          <hr />

          <ul className={ulClassName}>
            {this.categories.map(category => (
              <li
                className={liClassName}
                key={category.id()}
              >
                <Link
                  className={linkClassName}
                  dangerouslySetInnerHTML={{__html: category.name()}}
                  to={category.path()}
                />
              </li>
            ))}
          </ul>
          <hr />

          <ul className={ulClassName}>
            {this.archivesLinks.map(archivesLink => (
              <li
                className={liClassName}
                key={archivesLink.id()}
              >
                <Link
                  className={linkClassName}
                  dangerouslySetInnerHTML={{__html: archivesLink.title()}}
                  to={archivesLink.path()}
                />
              </li>
            ))}
          </ul>
          <hr />

          <SearchForm />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ui: state.ui })
const mapDispatchToProps = dispatch => bindActionCreators({ updateUI }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu)
