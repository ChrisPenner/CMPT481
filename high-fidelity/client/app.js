/* @flow */
import ReactDOM from 'react-dom'
import { Router, Route, IndexRedirect, Link, browserHistory } from 'react-router'
import { Provider, connect } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import QuickExpense from './components/QuickExpense'
import Statistics from './components/Statistics'
import Settings from './components/Settings'
import store from './store'
import { getUi } from './selectors'

import type { State, Ui } from './types'

import * as Routes from './routes'

type appArgs = {}

const stateToProps = (state: State) => ({
  ui: getUi(state),
})

type AppProps = {
  ui: Ui,
}

const App = connect(stateToProps)
(({ui:{settings}}: AppProps) => {
  return (
    <div>
      <section className="section is-fullwidth">
        { settings
          ? <Settings/>
            : <div className="columns">
            <QuickExpense/>
            <Statistics/>
          </div>
          }
      </section>
    </div>
  )})

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)

export default App
