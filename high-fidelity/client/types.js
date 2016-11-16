/* @flow */

import { ADD_EXPENSE, TOGGLE_SETTINGS } from './actions'

export type Expense = {}
export type Expenses = Array<Expense>

export type Category = {
  name: string
}
export type Categories = Array<Category>

export type ExpenseForm = {
  category: string,
  cost: number,
}

export type Ui = {
  settings: boolean
}

export type AddExpense = {
  type: 'ADD_EXPENSE',
  payload: Expense,
}

export type ChangeExpenseForm = {
  type: 'CHANGE_EXPENSE_FORM',
}

export type ToggleSettings = {
  type: 'TOGGLE_SETTINGS',
}

export type Action = AddExpense | ToggleSettings

export type State = {
  expenses: Expenses,
  expenseForm: ExpenseForm,
  categories: Categories,
  ui: Ui,
}
