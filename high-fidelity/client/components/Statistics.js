/* @flow */

import type {State, Categories} from '../types'
import {connect} from 'react-redux'
import {getTotalSpent, getCategories} from '../selectors'

const stateToProps = (state: State) => ({
  totalSpentFor: getTotalSpent(state),
  categories: getCategories(state)
})

type StatisticsProps = {
  totalSpentFor: Function,
  categories: Categories,
}

type CategoryProps = {
  category: Category,
  totalSpent: number,
}

const Category = ({category:{name}, totalSpent}: CategoryProps) => (
  <div className='category-chart'>
    <h2 className="subtitle"> {name} </h2>
    <div className="columns bars">
      <div className="notification is-primary" style={{width: `${totalSpent}%`}}></div> 
      <h2 className="cost-label subtitle">${totalSpent}</h2>
    </div>
  </div>
)

const Statistics = ({totalSpentFor, categories}: StatisticsProps) => {

  const _categories = categories.map((category, i) => (
    <Category
      key={i}
      totalSpent={totalSpentFor(category.name)}
      category={category}/>
  ))
  return (
    <div className="column section card is-two-thirds">
      <h1 className="title"> Monthly Expenses </h1>
      <hr/>

      {_categories}
    </div>
)}

export default connect(stateToProps)(Statistics)
