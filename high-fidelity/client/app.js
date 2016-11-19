/* @flow */
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { Wisps } from 'wisp-react-redux'

import QuickExpense from './components/QuickExpense'
import Statistics from './components/Statistics'
import Settings from './components/Settings'
import Nav from './components/Nav'
import Carousel from './components/Carousel'
import store from './store'
import { getUi } from './selectors'

import type { State, Ui } from './types'

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
      <Wisps/>
      <section className="section is-fullwidth">
        { settings
          ? <Settings/>
            : <div className="columns">
            <QuickExpense/>
            <Carousel>
              <Statistics timeframe="Weekly" />
              <Statistics timeframe="Monthly" />
              <Statistics timeframe="Yearly" />
            </Carousel>
            <Nav/>
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
