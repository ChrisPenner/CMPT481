/* @flow */

import { ADD_EXPENSE } from './actions'

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

export type AddExpense = {
  type: 'ADD_EXPENSE',
  payload: Expense,
}

export type Action = AddExpense

export type State = {
  expenses: Expenses,
  expenseForm: ExpenseForm,
  categories: Categories,
}
