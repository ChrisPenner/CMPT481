/* @flow */

import type {Expense} from '../types'
import { getExpenseForm } from '../selectors'

export const ADD_EXPENSE = 'ADD_EXPENSE'
export const addExpense = () => (dispatch:Function, getState:Function) => {
  dispatch({
    type: ADD_EXPENSE,
    payload: getExpenseForm(getState()),
  })
}

export const CHANGE_EXPENSE_FORM = 'CHANGE_EXPENSE_FORM'
export const changeExpenseForm = (path: string, value:any) => ({ 
  type: CHANGE_EXPENSE_FORM,
  payload: {
    path,
    value
  }
})
