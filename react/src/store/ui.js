import deepEqual from 'deep-equal'
import { createAction, handleActions } from 'redux-actions'

const UPDATE_UI = 'UPDATE_UI'

export const initialState = {}

export const reducer = handleActions({
  [UPDATE_UI]: (state, action) => ({
    ...state,
    ...action.payload
  })
}, initialState)

export const updateUI = createAction(UPDATE_UI)
export const updateHeader = createAction(UPDATE_UI, header => {
  return { header }
})

export const middleware = () => store => next => action => {
  if (action.type === UPDATE_UI) {
    const state = store.getState().ui
    let willChange = false
    for (let key in action.payload) {
      if (!deepEqual(action.payload[key], state[key])) {
        willChange = true
      }
    }
    if (!willChange) {
      return
    }
  }

  return next(action)
}
