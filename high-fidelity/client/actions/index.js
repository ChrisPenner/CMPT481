/* @flow */
import {successWisp} from 'wisp-react-redux'

import type {
    Category,
    Expense,
    AddExpense,
    ChangeExpenseForm,
    ToggleSettings,
    ToggleAddExpense,
    EditCategory,
    EditBudget,
} from '../types'

import { getExpenseForm } from '../selectors'

export const ADD_EXPENSE = 'ADD_EXPENSE'
export const addExpense = () => (dispatch:Function, getState:Function) => {
  dispatch({
    type: ADD_EXPENSE,
    payload: getExpenseForm(getState()),
  })
  dispatch(successWisp({title: 'Added!'}))
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

export const TOGGLE_ADD_EXPENSE = 'TOGGLE_ADD_EXPENSE'
export const toggleAddExpense = (): ToggleAddExpense => ({
  type: TOGGLE_ADD_EXPENSE,
})

export const EDIT_CATEGORY = 'EDIT_CATEGORY'
export const editCategory = (changes: Category):EditCategory => ({
  type: EDIT_CATEGORY,
  payload: changes,
})


export const EDIT_BUDGET = 'EDIT_BUDGET'
export const editBudget = (n:number):EditBudget => ({
  type: EDIT_BUDGET,
  payload: n,
})
