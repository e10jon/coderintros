// @flow

import React from 'react'

const Newsletter = ({formAction, frequencyGroup}: {formAction: ?string, frequencyGroup: ?string}) => {
  return (
    <div
      className='sans-serif border border-gray p2 mx-auto bg-darken-0 bg-cover bg-bottom bg-no-repeat bg-left flex flex-column justify-center bg-gray'
      style={{
        height: '280px',
        maxWidth: '336px'
      }}
    >
      <div className='h2 mb2 line-height-3 bold'>
        {'Get intros in your inbox'}
      </div>

      <form
        action={formAction}
        method='post'
        target='_blank'
      >
        <div className='flex'>
          <input
            className='input mb0 col-9 flex-auto not-rounded border-right-none'
            name='EMAIL'
            placeholder='youremail@domain.com'
            type='email'
          />

          <input
            name={`group[${frequencyGroup || ''}]`}
            type='hidden'
            value='2'
          />

          <button
            className='btn btn-primary col-3 h5 regular ups not-rounded border-left-none'
            style={{flex: '0 0 80px'}}
            type='submit'
          >
            {'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

Newsletter.displayName = 'Newsletter'

export default Newsletter
