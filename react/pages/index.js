// @flow

import React from 'react'

import createPage from '../components/page'

const Home = (props: Object) => {
  return (
    <div>{'Welcome to next.js!'}</div>
  )
}

Home.displayName = 'Home'

export default createPage(Home, {
  propPaths: () => ({
    homeData: '/'
  })
})
