/* @flow */

import type {ExpenseForm, Action} from '../types'
import R from 'ramda'

import { CHANGE_EXPENSE_FORM, ADD_EXPENSE } from '../actions'

const initialState = {
  category: 'food',
  cost: 0,
}

const expenseFormReducer = (state:ExpenseForm=initialState, action:Action) => {
  switch (action.type) {
    case CHANGE_EXPENSE_FORM:
      const {path, value} = action.payload
      return R.assoc(path, value, state)

    case ADD_EXPENSE:
      return initialState

    default:
      return state
  }
}

export default expenseFormReducer
