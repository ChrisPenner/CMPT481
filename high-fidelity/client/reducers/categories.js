/* @flow */

import R from 'ramda'

import { EDIT_CATEGORY } from '../actions'

import type {Categories, Action} from '../types'

const initialState = [
  {
    id: 0,
    name: 'Food',
    budget: 0,
    color: '#3273dc',
  },
  {
    id: 1,
    name: 'Entertainment',
    budget: 0,
    color: '#23d160',
  },
  {
    id: 2,
    name: 'Transportation',
    budget: 0,
    color: '#ffdd57',
  },
  {
    id: 3,
    name: 'Housing',
    budget: 0,
    color: '#ff3860',
  },
  {
    id: 4,
    name: 'Miscellaneous',
    budget: 0,
    color: '#ff38b4',
  },
]

const expensesReducer = (state:Categories=initialState, action:Action) => {
  switch (action.type) {
    case EDIT_CATEGORY:
      const { id } = action.payload
      return R.over(R.lensIndex(id), R.merge(R.__, action.payload), state)

    default:
      return state
  }
}

export default expensesReducer
