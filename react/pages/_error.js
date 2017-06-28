// @flow

import React from 'react'

import createPage from '../helpers/create-page'

export const Error = () => (
  <div className='center h2'>
    <hr />
    {'There was an error.'}
    <hr />
  </div>
)

export default createPage(Error, {
  maxWidth: 3
})
