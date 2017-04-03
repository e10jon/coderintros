import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  reducer as uiReducer,
  middleware as uiMiddleware
} from 'store/ui'

export default function ({state} = {}) {
  const middlewares = [uiMiddleware()]

  return createStore(
    combineReducers({
      ui: uiReducer
    }),
    state,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
}
