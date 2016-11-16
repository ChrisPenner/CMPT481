/* @flow */

import R from 'ramda'
import {TOGGLE_SETTINGS} from '../actions'

import type {Ui, Action} from '../types'

const initialState = {
  settings: true,
}
const expensesReducer = (state:Ui=initialState, action:Action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS:
      return R.evolve({
        settings: R.not,
      }, state)
    default:
      return state
  }
}

export default expensesReducer
