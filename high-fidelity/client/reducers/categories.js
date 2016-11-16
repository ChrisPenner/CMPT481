/* @flow */

import R from 'ramda'

import type {Categories, Action} from '../types'

const initialState = [
  {
    name: 'Food',
  },
  {
    name: 'Entertainment',
  },
  {
    name: 'Transportation',
  },
  {
    name: 'Housing',
  },
]

const expensesReducer = (state:Categories=initialState, action:Action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default expensesReducer
