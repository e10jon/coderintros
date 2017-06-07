// @flow

import React from 'react'

import createPage from '../components/page'
import Link from '../helpers/link'

const Page = ({pagesData}) => {
  const pageData = pagesData[0]

  return (
    <div>
      <Link href={pageData.link}>
        <h1>{pageData.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{__html: pageData.content.rendered}} />
      </Link>
    </div>
  )
}

Page.displayName = 'Page'

export default createPage(Page, {
  propPaths: ({asPath}) => ({
    pagesData: `/wp/v2/pages?slug=${asPath.match(/\/(.+)/)[1]}`
  })
})
