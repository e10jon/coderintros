// @flow

import React from 'react'

const Ad = ({className = '', hideAt = [], width, height}: Object) => (
  <div
    className={`bg-silver ${className} ${hideAt.map(b => `${b}-hide`).join(' ')}`}
    style={{width, height}}
  >
    {''}
  </div>
)

export default Ad
