// @flow

import React from 'react'

const ContentEditable = ({children, Icon}: {children: Object, Icon: Object}) => (
  <div className='flex items-center response-row'>
    <Icon />
    <div className='flex-auto'>
      {children}
    </div>
  </div>
)

export default ContentEditable
