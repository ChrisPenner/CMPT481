/* @flow */

import { connect } from 'react-redux'

import { toggleSettings } from '../actions'
import { getCategories } from '../selectors'

import type { State, Categories } from '../types'

const CategorySetting = ({name}) => (
  <tr>
    <td>
      <input className="subtitle" value={name} />
    </td>
    <td className="is-flex">
      <div className="has-margin">$</div>
      <input className="input" type="number"/>
    </td>
  </tr>
)

const stateToProps = (state: State) => ({
  categories: getCategories(state),
})

const dispatchProps = {
  toggleSettings,
}

type SettingsProps = {
  toggleSettings: Function,
  categories: Categories,
}

const Settings = ({toggleSettings, categories} : SettingsProps) => (
  <div className="settings section card is-fullwidth">
    <nav>
      <a onClick={() => toggleSettings()} className="icon is-medium">
        <i className="fa fa-close"></i>
      </a>
    </nav>

    <h1 className="title">Settings</h1>

    <p className="control">
      <label className="label"> Budget </label>
      <input className="input" type="number "/>
    </p>

    <table className="table is-striped">
      <th> Category </th>
      <th> Budget </th>
    {
      categories.map((category, i) => <CategorySetting {...category} key={i} />
      )
    }
    </table>


  </div>
)

export default connect(stateToProps, dispatchProps)(Settings)
