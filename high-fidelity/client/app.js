/* @flow */
import ReactDOM from 'react-dom'
import { Router, Route, IndexRedirect, Link, browserHistory } from 'react-router'
import { Provider, connect } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import QuickExpense from './components/QuickExpense'
import Statistics from './components/Statistics'
import store from './store'

import * as Routes from './routes'

type appArgs = {}
const App = connect()
(({}) => {
  return (
    <div>
      <section className="main section is-fullwidth columns">
        <QuickExpense/>
        <Statistics/>
      </section>
    </div>
  )})

const My404 = () => (
  <div>
    404 :'(
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={syncHistoryWithStore(browserHistory, store)}>
      <Route
        path="/"
        component={App}
        >
      </Route>
      <Route
        path="*"
        component={My404} />
    </Router>
  </Provider>,
  document.getElementById('app')
)

export default App
