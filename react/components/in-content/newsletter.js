// @flow

import React from 'react'

const Newsletter = ({formAction, frequencyGroup}: {formAction: ?string, frequencyGroup: ?string}) => {
  return (
    <div
      className='sans-serif border border-gray mx-auto bg-darken-0 flex flex-wrap'
      style={{
        height: '280px',
        maxWidth: '600px'
      }}
    >
      <div
        className='xs-hide sm-col-4 self-stretch bg-cover bg-top bg-no-repeat bg-center'
        style={{
          backgroundImage: 'url(/static/img/in-content/mailbox.jpg)'
        }}
      />

      <div className='col-12 sm-col-8 px3 self-center'>
        <div className='h2 mb2 line-height-3 bold'>
          {'Get intros in your inbox'}
        </div>

        <form
          action={formAction}
          className='flex'
          data-ga-event-action='Submitted Newsletter Form'
          data-ga-event-category='In-content Units'
          data-ga-on='submit'
          method='post'
          target='_blank'
        >
          <input
            className='input mb0 col-9 flex-auto not-rounded border-right-none'
            name='EMAIL'
            placeholder='name@domain.com'
            type='email'
          />

          <input
            name={`group[${frequencyGroup || ''}]`}
            type='hidden'
            value='2'
          />

          <button
            className='btn btn-primary col-3 h5 ups not-rounded border-left-none'
            style={{flex: '0 0 90px'}}
            type='submit'
          >
            {'Sign up'}
          </button>
        </form>
      </div>
    </div>
  )
}

Newsletter.displayName = 'Newsletter'

export default Newsletter
