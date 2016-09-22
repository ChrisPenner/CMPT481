import R from 'ramda'

const actionsList = [
  "SELECT_DAY"
]

const actionTypeCreators = {
}
export default R.merge(R.zipObj(actionsList, actionsList), actionTypeCreators)
