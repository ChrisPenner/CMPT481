/* @flow */
import ReactDOM from 'react-dom'
import { Router, Route, IndexRedirect, Link, browserHistory } from 'react-router'
import { Provider, connect } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import store, { Page } from './store'

import * as Routes from './routes'
import { Toasts } from './lib/wisp'

type appArgs = {}
const App = connect()
(({}) => {
  return (
    <div>
      <nav className="nav has-shadow">
        <div className="nav-left">
          <span className="nav-item is-brand">CMPT481</span>
        </div>
        <div className="nav-right">
          Links
        </div>
      </nav>
      <Toasts/>
      <section className="section is-fullwidth">
        <h1 className="title">My App, not yours</h1>
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
		path="/haai"
		component={Page}
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
