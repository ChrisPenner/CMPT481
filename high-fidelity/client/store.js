/* @flow */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import promiseMiddleware from 'redux-promise';
import { browserHistory } from 'react-router'

import reducer from './reducers'
import { INDEX, GET, PUT, DELETE } from './api'

const middleware = compose(
  applyMiddleware(
    promiseMiddleware,
    routerMiddleware(browserHistory),
    thunk.withExtraArgument({INDEX, GET, PUT, DELETE})
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f)
const store = createStore(reducer, middleware)

export default store
