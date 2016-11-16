/* @flow */

import {connect} from 'react-redux'
import {addExpense, changeExpenseForm} from '../actions'
import { getExpenseForm, getCategories } from '../selectors'

import type { State, Categories } from '../types'

const stateToProps = (state: State) => ({
  form: getExpenseForm(state),
  categories: getCategories(state),
})

const dispatchProps = {
  addExpense,
  changeExpenseForm,
}

type QuickExpenseProps = {
  form: {
    category: string,
    cost: number,
  },
  addExpense: Function,
  changeExpenseForm: Function,
  categories: Categories,
}

const QuickExpense = ({categories, addExpense, changeExpenseForm, form:{category, cost}} : QuickExpenseProps) => (
  <div className="column section card is-one-third is-hidden-mobile">
    <h1 className="title"> Add an expense </h1>
    <hr/>
    <label className="label">Category</label>
    <p className="control">
      <label className="select">
        <select value={category} onChange={e => changeExpenseForm('category', e.target.value)} className="select">
              <option value=''>
                Choose a Category
              </option>
          {
            categories.map(({name}) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))
          }
        </select>
      </label>
    </p>

    <p className="control">
      <label className="label"> Cost </label>
      <input value={cost} onChange={e => changeExpenseForm('cost', e.target.value)} className="input" type="number "/>
    </p>

      <button disabled={category == ''} onClick={() => addExpense()} className="button is-primary is-fullwidth">Submit</button>
  </div>
)

export default connect(stateToProps, dispatchProps)(QuickExpense)
