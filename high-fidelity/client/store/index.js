/* @flow */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducer from '../reducers'

const middleware = compose(
  applyMiddleware(
    thunk
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f)
const store = createStore(reducer, middleware)

export default store
