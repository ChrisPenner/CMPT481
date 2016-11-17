/* @flow */

import { connect } from 'react-redux'

import { toggleSettings, editCategory, editBudget } from '../actions'
import { getCategories, getBudget } from '../selectors'

import type { State, Categories, Budget } from '../types'


const catSettingStateToProps = () => ({})
const catSettingDispatchProps = {
  editCategory,
}

const CategorySetting = connect(catSettingStateToProps, catSettingDispatchProps)(({name, id, color, budget, editCategory}) => (
  <tr>
    <td>
      <div className="is-flex">
        <div style={{
          background: color,
            width: '30px',
            height: '30px',
            borderRadius: '100%',
        }}/>
      &nbsp; &nbsp;
      <input
        onChange={e => editCategory({id, name: e.target.value})}
        className="subtitle"
        value={name} />
    </div>
  </td>
    <td className="">
      <div className="is-flex"><span className="has-margin">$</span><input
        onChange={e => editCategory({id, budget: e.target.value})}
        value={budget}
        className="input"
        type="number"/>
    </div>
    </td>
  </tr>
))

const stateToProps = (state: State) => ({
  categories: getCategories(state),
  budget: getBudget(state),
})

const dispatchProps = {
  toggleSettings,
  editBudget,
}

type SettingsProps = {
  toggleSettings: Function,
  editBudget: Function,
  budget: Budget,
  categories: Categories,
}

const Settings = ({toggleSettings, editBudget, budget, categories} : SettingsProps) => (
  <div className="settings section card is-fullwidth">
    <nav>
      <a onClick={() => toggleSettings()} className="icon is-medium">
        <i className="fa fa-close"></i>
      </a>
    </nav>

    <h1 className="title">Settings</h1>

    <p className="control">
      <label className="label"> Overall Budget </label>
      <input onChange={e => editBudget(e.target.value)} value={budget} className="input" type="number "/>
    </p>

    <table className="table is-striped">
      <tbody>
        <tr>
          <th> Category </th>
          <th> Budget </th>
        </tr>

        {
          categories.map((category, i) => <CategorySetting {...category} key={i} />
          )
        }
      </tbody>
    </table>


  </div>
)

export default connect(stateToProps, dispatchProps)(Settings)
