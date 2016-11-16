/* @flow */

import type { Expense, AddExpense, ChangeExpenseForm, ToggleSettings } from '../types'
import { getExpenseForm } from '../selectors'

export const ADD_EXPENSE = 'ADD_EXPENSE'
export const addExpense = () => (dispatch:Function, getState:Function) => {
  dispatch({
    type: ADD_EXPENSE,
    payload: getExpenseForm(getState()),
  })
}

export const CHANGE_EXPENSE_FORM = 'CHANGE_EXPENSE_FORM'
export const changeExpenseForm = (path: string, value:any):ChangeExpenseForm => ({ 
  type: CHANGE_EXPENSE_FORM,
  payload: {
    path,
    value
  }
})

export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS'
export const toggleSettings = (): ToggleSettings => ({
  type: TOGGLE_SETTINGS,
})

