/* @flow */

import type {State} from '../types'
import {connect} from 'react-redux'
import {getTotalSpent} from '../selectors'

const stateToProps = (state: State) => ({
  totalSpentFor: getTotalSpent(state),
})

type StatisticsProps = {
  totalSpentFor: Function,
}

const Statistics = ({totalSpentFor}: StatisticsProps) => (
  <div className="column section card is-two-thirds">
    <h1 className="title"> Monthly Expenses </h1>
    <hr/>

    <h2 className="subtitle"> Food {totalSpentFor('food')}</h2>
    <div className="columns bars">
      <div className="notification is-primary" style={{width: `${totalSpentFor('food')}%`}}></div> 
    </div>

    <h2 className="subtitle"> Entertainment </h2>
    <div className="columns bars">
      <div className="notification is-primary" style={{width: '20%'}}></div> 
    </div>

    <h2 className="subtitle"> Rent </h2>
    <div className="columns bars">
      <div className="notification is-primary" style={{width: '74%'}}></div> 
    </div>

    <h2 className="subtitle"> Transportation </h2>
    <div className="columns bars">
      <div className="notification is-primary" style={{width: '90%'}}></div> 
    </div>
  </div>
)

export default connect(stateToProps)(Statistics)
