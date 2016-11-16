/* @flow */

import type { State, Categories } from '../types'
import { connect } from 'react-redux'
import { getTotalSpent, getCategories } from '../selectors'
import { toggleSettings } from '../actions'

type CategoryProps = {
  category: Category,
  totalSpent: number,
}

const Category = ({category:{name}, totalSpent}: CategoryProps) => (
  <div className='category-chart'>
    <h2 className="subtitle"> {name} </h2>
    <div className="bars">
      <div className="bar notification is-primary" style={{width: `${totalSpent}%`}}></div>
      <h2 className="cost-label subtitle">${totalSpent}</h2>
    </div>
  </div>
)

const stateToProps = (state: State) => ({
  totalSpentFor: getTotalSpent(state),
  categories: getCategories(state)
})

const dispatchProps = {
  toggleSettings,
}

type StatisticsProps = {
  totalSpentFor: Function,
  categories: Categories,
  toggleSettings: Function,
}

const Statistics = ({totalSpentFor, toggleSettings, categories}: StatisticsProps) => {

  return (
    <div className="column section card is-fullwidth">
      <button className="button is-primary is-hidden-tablet is-fullwidth"> Add Expense </button>

      <nav>
        <a onClick={() => toggleSettings()} className="icon is-medium">
          <i className="fa fa-cog"></i>
        </a>
      </nav>

      <hr className="is-hidden-tablet" />
      <h1 className="title"> Monthly Expenses </h1>
      <hr/>
      {
        categories.map((category, i) => (
          <Category
            key={i}
            totalSpent={totalSpentFor(category.name)}
            category={category}/>
        ))
      }
      </div>
)}

export default connect(stateToProps, dispatchProps)(Statistics)
