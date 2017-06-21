// @flow

import React from 'react'
import PropTypes from 'prop-types'

const NavButton = ({section}: Object, {interviewStore}: Object) => {
  const handleClick = () => {
    interviewStore.changeStep(section)
  }

  return (
    <a
      className='inline-block px1 mx1 underline'
      href='javascript:void(0)'
      onClick={handleClick}
    >
      {section}
    </a>
  )
}

NavButton.contextTypes = {
  interviewStore: PropTypes.object
}

export default NavButton
