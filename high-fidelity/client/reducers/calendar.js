/* @flow */
import at from '../action-types.js'
import R from 'ramda'

export default (state: Object = {}, {type, payload} : Object) => {
  switch (type) {
    case at.SELECT_DAY:
      return R.assoc('focused', payload, state)
    default:
      return state;
  }
}
