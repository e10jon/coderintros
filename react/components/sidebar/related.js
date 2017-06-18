// @flow

import React from 'react'

const Related = ({className = ''}: Object) => (
  <div
    className={`border border-gray gray px2 py4 center ${className}`}
    style={{backgroundColor: '#f8f8f8', height: 800}}
  >
    {'Check out these related coders.'}
  </div>
)

export default Related
