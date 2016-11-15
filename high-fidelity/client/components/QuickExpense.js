/* @flow */

import {connect} from 'react-redux'
import {addExpense, changeExpenseForm} from '../actions'
import { getExpenseForm } from '../selectors'

import type {State} from '../types'

const stateToProps = (state: State) => ({
  ...getExpenseForm(state),
})

const dispatchProps = {
  addExpense,
  changeExpenseForm,
}

type QuickExpenseProps = {
  category: string,
  cost: number,
  addExpense: Function,
  changeExpenseForm: Function,
}

const QuickExpense = ({addExpense, changeExpenseForm, category, cost} : QuickExpenseProps) => (
  <div className="column section card is-one-third">
    <h1 className="title"> Add an expense </h1>

    <label className="label">Category</label>
    <p className="control">
      <label className="select">
        <select value={category} onChange={e => changeExpenseForm('category', e.target.value)} className="select">
          <option value="food">
            Food
          </option>
          <option value="entertainment">
            Entertainment
          </option>
          <option value="rent">
            Rent
          </option>
        </select>
      </label>
    </p>

    <p className="control">
      <label className="label"> Cost </label>
      <input value={cost} onChange={e => changeExpenseForm('cost', e.target.value)} className="input" type="number "/>
    </p>

    <footer className="card-footer">
      <a onClick={() => addExpense()} className="card-footer-item">Submit</a>
    </footer>
  </div>
)

export default connect(stateToProps, dispatchProps)(QuickExpense)
