// @flow

import React from 'react'
import classNames from 'classnames'
import {
  IoClose as XIcon,
  IoCheckmark as CheckMarkIcon
} from 'react-icons/lib/io'

const SubmissionStatusItem = ({children, isValid}: {children?: Node, isValid: ?boolean}) => (
  <div className='flex my1 submission-status-item'>
    <div className='submission-status-item-icon'>
      {isValid !== null ? (
        isValid ? <CheckMarkIcon className='green' /> : <XIcon className='red' />
      ) : null}
    </div>
    <div className={classNames(['flex-auto', isValid || isValid === null ? 'gray' : 'black'])}>
      {children}
    </div>
  </div>
)

SubmissionStatusItem.defaultProps = {
  children: null
}

export default SubmissionStatusItem
