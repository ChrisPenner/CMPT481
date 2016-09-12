/* @flow */
import R from 'ramda'

const fakeDispatch = (results) => (action) => results.push(action)

export const applyThunk = R.curry((reducer, initialState, globalState, thunk) => {
  const actions = []
  thunk(fakeDispatch(actions), () => globalState)
  return R.reduce(reducer, initialState, actions)
})
