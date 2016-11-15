/* @flow */

import R from 'ramda'
import {ADD_EXPENSE} from '../actions'

import type {Expenses, Action} from '../types'

const initialState = []
const expensesReducer = (state:Expenses=initialState, action:Action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return R.append(action.payload, state)
    default:
      return state
  }
}

export default expensesReducer
