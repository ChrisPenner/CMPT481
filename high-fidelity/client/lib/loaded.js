/* @flow */
import R from 'ramda'
import { connect } from 'react-redux'

export const loadedReducer = (state:Object={}, {type, payload}:Object) => {
  if (type.startsWith('LOAD')) {
    return R.assoc(type, true, state)
  }
  return state
}

export const loadedAction = (path:string) => ({
  type: 'LOADED',
  payload: path,
})

export const loadingGuard = ((Component: Function, dependencies: Array<string>, message: string) => connect()((props: Object) => {
  const isDefined = R.compose(R.not, R.equals(undefined), R.prop(R.__, props))
  debugger
  if (!R.all(isDefined, dependencies)){
    return <div> {message} </div>
  }
  return <Component {...props} />
}))
