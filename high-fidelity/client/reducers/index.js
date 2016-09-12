/* @flow */
import R from 'ramda'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import at from '../action-types'
import { wispReducer } from '../lib/wisp'

export default combineReducers({
  routing: routerReducer,
  toasts: wispReducer,
})
