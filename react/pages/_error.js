// @flow

import React from 'react'

import createPage from '../helpers/create-page'

export const Error = () => (
  <div className='center'>
    <hr />
    <h1 className='my4'>{'There was an error.'}</h1>
    <hr />
  </div>
)

export default createPage(Error, {
  maxWidth: 3
})
