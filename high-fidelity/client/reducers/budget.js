/* @flow */

import R from 'ramda'

import { EDIT_BUDGET } from '../actions'

import type {Budget, Action} from '../types'

const initialState = 200

const expensesReducer = (state:Budget=initialState, action:Action) => {
  switch (action.type) {
    case EDIT_BUDGET:
      return action.payload

    default:
      return state
  }
}

export default expensesReducer
