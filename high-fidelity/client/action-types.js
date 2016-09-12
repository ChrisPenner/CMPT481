import R from 'ramda'

const actionsList = [
]

const actionTypeCreators = {
}
export default R.merge(R.zipObj(actionsList, actionsList), actionTypeCreators)
