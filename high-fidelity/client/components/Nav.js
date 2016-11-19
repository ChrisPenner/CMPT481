/* @flow */

import { connect } from 'react-redux'
import { toggleSettings, toggleAddExpense } from '../actions'

const stateToProps = () => ({})

const dispatchProps = {
  toggleSettings,
  toggleAddExpense,
}

type NavProps = {
  toggleSettings: Function,
  toggleAddExpense: Function,
}

const Nav = ({toggleSettings, toggleAddExpense}) => (
  <nav className="main-nav">
    <a onClick={() => toggleSettings()} className="icon is-medium">
      <i className="fa fa-cog"></i>
    </a>
    <a onClick={() => toggleAddExpense()} className="icon is-medium is-hidden-tablet">
      <i className="fa fa-plus"></i>
    </a>
  </nav>
)

export default connect(stateToProps, dispatchProps)(Nav)
