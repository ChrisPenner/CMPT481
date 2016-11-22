/* @flow */

import { connect } from 'react-redux'
import classnames from 'classnames'

import R from 'ramda'

import type { State, Categories } from '../types'
import { getTotalSpent, getTotalSpentFor, getCategories, getBudget } from '../selectors'

type CategoryProps = {
  category: Category,
  totalSpent: number,
}

const Category = ({
  category:{name, color, budget}, totalSpent}: CategoryProps) => {
    const spentPercentage = (budget == 0) ? totalSpent : (100 * totalSpent / budget)
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

const dispatchProps = {}

type StatisticsProps = {
  totalSpentFor: Function,
  totalSpent: number,
  categories: Categories,
  budget: number,
  timeframe: string,
}

const Statistics = ({
  totalSpentFor, totalSpent,
  categories, budget,
  timeframe,
}: StatisticsProps) => {

  let multiplier = 1;
  switch (timeframe) {
    case 'Monthly':
      multiplier = 4
      break
    case 'Yearly':
      multiplier =  52
      break
  }

  return (
    <div style={{float: 'left', position: 'relative'}}>
      <h1 className="title"> {timeframe} Expenses </h1>
      <hr/>

      <Category
        totalSpent={totalSpent}
        budget={budget}
        key="-1"
        category={{
          name:"Overall",
          color: "#00d1b2",
          budget: budget * multiplier,
        }}/>

      <hr/>

      {
        categories.map(category => {
          const scaledCat = R.assoc('budget', category.budget * multiplier, category)
          return (
            <Category
              key={category.id}
              totalSpent={totalSpentFor(category.name)}
              category={scaledCat}/>
          )})
      }
      </div>
)}

export default connect(stateToProps, dispatchProps)(Statistics)
