import React from 'react'
import getYear from 'date-fns/get_year'

export const Footer = () => {
  return (
    <footer>
      <div className='max-width-4 mx-auto p2 center'>
        <div
          className='border-top border-silver pt2 h5'
          dangerouslySetInnerHTML={{__html: `&copy;${getYear(new Date())} WordAct.io`}}
        />
      </div>
    </footer>
  )
}

export default Footer
