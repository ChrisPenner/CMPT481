/* @flow */
import R from 'ramda'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { wispReducer } from 'wisp-react-redux'
import expensesReducer from './expenses'
import expenseFormReducer from './expenseForm'
import categoriesReducer from './categories'
import uiReducer from './ui'
import budgetReducer from './budget'

export default combineReducers({
  wisps: wispReducer,
  routing: routerReducer,
  expenses: expensesReducer,
  expenseForm: expenseFormReducer,
  categories: categoriesReducer,
  ui: uiReducer,
  budget: budgetReducer,
})
