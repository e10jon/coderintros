// @flow

import React from 'react'

import createPage from '../components/page'
import Link from '../helpers/link'

const Home = ({postsData}) => {
  return (
    <div>
      {postsData.map(p => (
        <div key={`Post${p.id}`}>
          <Link href={p.link}>
            {p.title.rendered}
          </Link>
        </div>
      ))}
    </div>
  )
}

Home.displayName = 'Home'

export default createPage(Home, {
  propPaths: () => ({
    postsData: '/wp/v2/posts'
  })
})
