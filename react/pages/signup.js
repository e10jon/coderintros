// @flow

import React from 'react'

import createPage from '../components/page'
import fetch from '../helpers/fetch'

const Signup = () => {
  let emailNode, passwordNode

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await fetch({
      data: {
        email: emailNode.value,
        password: passwordNode.value,
        username: emailNode.value
      },
      method: 'post',
      path: '/users'
    })

    console.log(res)

    return false
  }

  return (
    <div>
      <form
        action='/signup'
        method='post'
        onSubmit={handleSubmit}
      >
        <div>
          <label className='label'>{'Email'}</label>
          <input
            className='input'
            name='username'
            ref={r => { emailNode = r }}
            type='email'
          />
        </div>
        <div>
          <label className='label'>{'Password'}</label>
          <input
            className='input'
            name='password'
            ref={r => { passwordNode = r }}
            type='password'
          />
        </div>
        <div>
          <button
            className='btn btn-primary'
            type='submit'
          >
            {`Sign up`}
          </button>
        </div>
      </form>
    </div>
  )
}

Signup.displayName = 'Signup'

export default createPage(Signup)
