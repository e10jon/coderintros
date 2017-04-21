import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import defaultImgSrc from 'images/default.jpg'
import { updateUI } from 'store/ui'
import logo from 'images/logo.svg'
import { Post } from 'helpers/wp-objects'
import Byline from 'components/byline'
import 'styles/header.scss'

export class Header extends Component {
  static contextTypes = {
    pagesRes: PropTypes.shape()
  }

  static propTypes = {
    header: PropTypes.shape(),
    isMobileMenuShown: PropTypes.bool,
    updateUI: PropTypes.func.isRequired
  }

  static defaultProps = {
    header: {},
    isMobileMenuShown: false
  }

  componentWillMount () {
    this.pages = this.context.pagesRes && this.context.pagesRes.data ? (
      this.context.pagesRes.data.map(raw => new Post(raw))
    ) : []
  }

  handleMenuButtonClick = () => {
    this.props.updateUI({isMobileMenuShown: !this.props.isMobileMenuShown})
  }

  render () {
    const { header, isMobileMenuShown } = this.props
    const { title, titleTo, imageSrc, imageAlt, subtitle, byline, link } = header
    const { authorImageSrc, authorImageAlt, authorName, authorTo, date } = byline || {}

    return (
      <header className='white bg-silver relative overflow-hidden wa-header'>
        <img
          alt={imageAlt}
          className='absolute wa-header-image'
          src={imageSrc || defaultImgSrc}
        />

        <div className='wa-header-gradient' />

        <div className='flex flex-column items-center justify-center top-0 bottom-0 left-0 right-0 absolute mx-auto px1 wa-header-content-container'>
          <h1 className='wa-header-title'>
            <Link
              className='white'
              dangerouslySetInnerHTML={{__html: title || '&nbsp;'}}
              to={titleTo || '/'}
            />
          </h1>

          {subtitle ? (
            <h2
              className='wa-header-subtitle'
              dangerouslySetInnerHTML={{__html: subtitle}}
            />
          ) : null}

          {link ? (
            <div className='my1'>
              <a
                className='white h5'
                href={link}
                rel='noopener noreferrer'
                target='_blank'
              >
                <i className='fa fa-fw fa-external-link white inline-block mr1 align-middle' />
                <span className='inline-block'>{link}</span>
              </a>
            </div>
          ) : null}

          {byline && Object.keys(byline).length ? (
            <div className='mt2'>
              <Byline
                authorImageAlt={authorImageAlt}
                authorImageSrc={authorImageSrc}
                authorName={authorName}
                authorTo={authorTo}
                color='white'
                date={date}
              />
            </div>
          ) : null}
        </div>

        <div className='max-width-4 mx-auto flex justify-between items-center relative'>
          <Link
            className='block p2 mr1'
            to='/'
          >
            <i
              className='block fill-white wa-header-logo'
              dangerouslySetInnerHTML={{__html: logo}}
            />
          </Link>

          <a
            className='md-hide lg-hide p2 block'
            href='javascript:void(0)'
            id='header-menu-button'
            onClick={this.handleMenuButtonClick}
          >
            <i className={`fa fa-${isMobileMenuShown ? 'times' : 'bars'} fa-fw white`} />
          </a>

          <ul className='list-reset p2 m0 xs-hide sm-hide'>
            {this.pages.map(page => (
              <li
                className='inline-block ml2'
                id={`header-page-li-${page.id()}`}
                key={`HeaderPages${page.id()}`}
              >
                <Link
                  className='uppercase white h5'
                  dangerouslySetInnerHTML={{__html: page.navTitle()}}
                  to={page.path()}
                />
              </li>
            ))}
          </ul>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  header: state.ui.header,
  isMobileMenuShown: state.ui.isMobileMenuShown
})

const mapDispatchToProps = dispatch => bindActionCreators({ updateUI }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
