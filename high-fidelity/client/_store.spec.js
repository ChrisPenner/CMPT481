/* @flow */
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import promiseMiddleware from 'redux-promise';

export const createMockStore = (thunkArgument: any) => (initialState: any) => {
  const middleware = [
    promiseMiddleware,
    thunk.withExtraArgument(thunkArgument)
  ]
  return configureStore(middleware)(initialState)
}
