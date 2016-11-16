/* @flow */
import type {State} from '../types'
import R from 'ramda'

export const getExpenseForm = (state: State) => state.expenseForm
export const getExpenses = (state: State) => state.expenses
export const getCategories = (state: State) => state.categories

export const getTotalSpent = (state: State) => (category: string) => {
  const expenses = getExpenses(state)

  const isCategory = R.compose(
    R.equals(category),
    R.prop('category')
  )

  const getTotalCost = R.compose(
    R.sum,
    R.pluck('cost'),
    R.filter(isCategory)
  )

  return getTotalCost(expenses)
}
