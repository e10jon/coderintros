// @flow

import React from 'react'
import {
  FaTag as JobTitleIcon,
  FaBriefcase as EmployerIcon,
  FaGlobe as CurrentLocationIcon
} from 'react-icons/lib/fa'

const Tagline = ({className = '', postData}: Object) => {
  return (
    <div className={`gray ${className}`}>
      {postData.job_title && (
        <span className='inline-block tagline-item'>
          <JobTitleIcon />
          <span>{postData.job_title}</span>
        </span>
      )}

      {postData.employer && (
        <span className='inline-block tagline-item'>
          <EmployerIcon />
          <span>{postData.employer}</span>
        </span>
      )}

      {postData.current_location && (
        <span className='inline-block tagline-item'>
          <CurrentLocationIcon />
          <span>{postData.current_location}</span>
        </span>
      )}
    </div>
  )
}

export default Tagline
