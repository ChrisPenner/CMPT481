/* @flow */

import { connect } from 'react-redux'
import { addExpense, changeExpenseForm, toggleAddExpense } from '../actions'
import { getExpenseForm, getCategories, getUi } from '../selectors'
import classnames from 'classnames'

import type { State, Categories } from '../types'

const stateToProps = (state: State) => ({
  form: getExpenseForm(state),
  categories: getCategories(state),
  visible: getUi(state).addExpense,
})

const dispatchProps = {
  addExpense,
  changeExpenseForm,
  toggleAddExpense,
}

type QuickExpenseProps = {
  form: {
    category: string,
    cost: number,
  },
  toggleAddExpense: Function,
  addExpense: Function,
  changeExpenseForm: Function,
  categories: Categories,
  visible: boolean,
}

const QuickExpense = ({categories, addExpense, toggleAddExpense, changeExpenseForm, visible, form:{category, cost}} : QuickExpenseProps) => (
  <div id="expense-form" className={classnames('column', 'section', 'card', 'is-one-third', {
    visible,
  })}>
    <nav className="is-hidden-tablet">
      <a onClick={() => toggleAddExpense()} className="icon is-medium">
        <i className="fa fa-close"></i>
      </a>
    </nav>
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
      <input
        value={cost}
        onChange={e => changeExpenseForm('cost', e.target.value)}
        className="input" min="1" max="99999" type="number"/>
    </p>

    <div className="is-flex button-bar is-hidden-mobile">
      <button
        disabled={category == ''}
        onClick={() => addExpense()}
        className="button is-primary">
        Add Expense
      </button>
    </div>

    <div className="is-flex button-bar is-hidden-tablet">
      <button
        disabled={category == ''}
        onClick={() => addExpense()}
        className="button is-info">
        Add Another
      </button>

      <button
        disabled={category == ''}
        onClick={() => {toggleAddExpense(); addExpense()}}
        className="button is-primary">
        Done
      </button>
    </div>

  </div>
)

export default connect(stateToProps, dispatchProps)(QuickExpense)
