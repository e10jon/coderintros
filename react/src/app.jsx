import React, { Component, PropTypes } from 'react'
import { resolve } from 'react-resolver'
import { Helmet } from 'react-helmet'

import { SwitchComponent } from './routes'
import Header from 'components/header'
import Footer from 'components/footer'
import MobileMenu from 'components/mobile-menu'
import WPRequest from 'helpers/wp-request'
import favicon from 'images/favicon.png'

import 'styles/app.scss'

const googleAnalyticsScript = trackingId =>
`(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', '${trackingId}', 'auto');ga('send', 'pageview');`

export class App extends Component {
  static contextTypes = {
    router: PropTypes.shape().isRequired
  }

  static propTypes = {
    archivesLinksRes: PropTypes.shape().isRequired,
    categoriesRes: PropTypes.shape().isRequired,
    cookie: PropTypes.string,
    pagesRes: PropTypes.shape().isRequired,
    recentPostsRes: PropTypes.shape().isRequired
  }

  static childContextTypes = {
    cookie: PropTypes.string,
    pagesRes: PropTypes.shape(),
    categoriesRes: PropTypes.shape(),
    recentPostsRes: PropTypes.shape(),
    archivesLinksRes: PropTypes.shape()
  }

  static defaultProps = {
    cookie: ''
  }

  getChildContext () {
    return {
      cookie: this.props.cookie,
      pagesRes: this.props.pagesRes,
      categoriesRes: this.props.categoriesRes,
      recentPostsRes: this.props.recentPostsRes,
      archivesLinksRes: this.props.archivesLinksRes
    }
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    const {
      pathname: currentPathname,
      search: currentSearch,
      hash: currentHash
    } = this.context.router.route.location

    const {
      pathname: nextPathname,
      search: nextSearch,
      hash: nextHash
    } = nextContext.router.route.location

    return (
      currentPathname !== nextPathname ||
      currentSearch !== nextSearch ||
      currentHash !== nextHash
    )
  }

  render () {
    return (
      <div>
        <Helmet>
          <link
            href={favicon}
            rel='shortcut icon'
          />
          {process.env.GA_TRACKING_ID ? (
            <script type='text/javascript'>{googleAnalyticsScript(process.env.GA_TRACKING_ID)}</script>
          ) : null}
        </Helmet>

        <MobileMenu>
          <Header />
          <main className='flex-auto'>
            {SwitchComponent}
          </main>
          <Footer />
        </MobileMenu>
      </div>
    )
  }
}

const resolvers = {
  categoriesRes: () => new WPRequest('/wp/v2/categories'),
  pagesRes: () => new WPRequest('/wp/v2/pages?orderby=menu_order&order=asc'),
  recentPostsRes: () => new WPRequest('/wp/v2/posts?_embed'),
  archivesLinksRes: () => new WPRequest('/wordact/archives_links')
}

export default resolve(resolvers)(App)
