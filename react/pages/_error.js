// @flow

import React from 'react'

import createPage from '../helpers/create-page'

const Error = () => (
  <div className='center h2'>{'There was an error.'}</div>
)

export default createPage(Error, {
  maxWidth: 3
})
