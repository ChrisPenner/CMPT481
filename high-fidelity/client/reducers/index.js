/* @flow */
import R from 'ramda'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import expensesReducer from './expenses'
import expenseFormReducer from './expenseForm'
import categoriesReducer from './categories'
import uiReducer from './ui'

export default combineReducers({
  routing: routerReducer,
  expenses: expensesReducer,
  expenseForm: expenseFormReducer,
  categories: categoriesReducer,
  ui: uiReducer,
})
