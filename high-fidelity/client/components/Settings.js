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
        min="1"
        max="9999"
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
    <h1 className="title">Settings</h1>

    <p className="control">
      <label className="label"> Overall Weekly Budget </label>
      <input onChange={e => editBudget(e.target.value)} value={budget} className="input" pattern="[0-9]*"
      />
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

    <button onClick={() => toggleSettings()} className="is-fullwidth is-primary button">
      Save
    </button>
  </div>
)

export default connect(stateToProps, dispatchProps)(Settings)
