// @flow

import React from 'react'

const Suggest = ({className = ''}: Object) => (
  <div
    className={`border border-gray gray px2 py4 center ${className}`}
    style={{backgroundColor: '#f8f8f8'}}
  >
    {'Know someone that would be great for Coder Intros?'}
  </div>
)

export default Suggest
