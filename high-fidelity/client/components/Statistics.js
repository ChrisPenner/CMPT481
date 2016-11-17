/* @flow */

import type { State, Categories } from '../types'
import { connect } from 'react-redux'
import { getTotalSpent, getTotalSpentFor, getCategories, getBudget } from '../selectors'
import { toggleSettings, toggleAddExpense } from '../actions'
import classnames from 'classnames'

type CategoryProps = {
  category: Category,
  totalSpent: number,
}

const Category = ({
  category:{name, color, budget}, totalSpent}: CategoryProps) => {
    const spentPercentage = (budget == 0) ? totalSpent : (totalSpent * 100 / budget)
    const isOver = budget != 0 && totalSpent > budget
    return (
      <div className='category-chart'>
        <h2 className="subtitle"> {name} </h2>
        <div className="bars">
          <div
            className="bar notification"
            style={{
              width: `${spentPercentage}%`,
                background: color,
            }}
          />
          <h2 className={classnames("cost-label subtitle", {
            "error": isOver,
            "success": !isOver,
          })}>${totalSpent}{budget == 0 ? null : `/$${budget}`}</h2>
        </div>
      </div>
    )
  }

const stateToProps = (state: State) => ({
  totalSpentFor: getTotalSpentFor(state),
  totalSpent: getTotalSpent(state),
  categories: getCategories(state),
  budget: getBudget(state),
})

const dispatchProps = {
  toggleSettings,
  toggleAddExpense,
}

type StatisticsProps = {
  totalSpentFor: Function,
  toggleSettings: Function,
  toggleAddExpense: Function,
  totalSpent: number,
  categories: Categories,
  budget: number,
}

const Statistics = ({
  totalSpentFor, toggleSettings, toggleAddExpense, totalSpent,
  categories, budget,
}: StatisticsProps) => {

  return (
    <div className="column section card is-fullwidth">
      <nav className="main-nav">
        <a onClick={() => toggleSettings()} className="icon is-medium">
          <i className="fa fa-cog"></i>
        </a>
        <a onClick={() => toggleAddExpense()} className="icon is-medium is-hidden-tablet">
          <i className="fa fa-plus"></i>
        </a>
      </nav>

      <h1 className="title"> Monthly Expenses </h1>
      <hr/>

      <Category
        totalSpent={totalSpent}
        budget={budget}
        key="-1"
        category={{
          name:"Overall",
          color: "#00d1b2",
          budget,
        }}/>

      <hr/>

      {
        categories.map(category => (
          <Category
            key={category.id}
            totalSpent={totalSpentFor(category.name)}
            category={category}/>
        ))
      }
      </div>
)}

export default connect(stateToProps, dispatchProps)(Statistics)
