/* @flow */

import R from 'ramda'
import {TOGGLE_SETTINGS, TOGGLE_ADD_EXPENSE} from '../actions'

import type {Ui, Action} from '../types'

const initialState = {
  settings: false,
  addExpense: false,
}
const expensesReducer = (state:Ui=initialState, action:Action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS:
      return R.evolve({
        settings: R.not,
      }, state)

    case TOGGLE_ADD_EXPENSE:
      return R.evolve({
        addExpense: R.not,
      }, state)

    default:
      return state
  }
}

export default expensesReducer
