/* @flow */
import R from 'ramda'
import { connect } from "react-redux"
import { selectDay } from '../actions'
import classnames from 'classnames'

const Day = connect(state => ({focused: state.calendar.focused}))(({number, selectDay, focused}) => {
  const dayClasses = classnames('day', 'column', {
    focused: focused == number
  })
  return (
    <div key={number} className={dayClasses} onClick={() => selectDay(number)}>
      <h1 className="title"> {number}</h1>
    </div>
  )})

const Week = ({start, selectDay}) => {
  const days = R.map(
    num => <Day key={num} number={num} selectDay={selectDay} />,
    R.range(start, start + 7))

  return (
    <div key={start} className="week columns">
      {days}
      <div className="bar1 bar"> </div>
      <div className="bar2 bar"> </div>
      <div className="bar3 bar"> </div>
    </div>
)}

const Calendar = ({selected, selectDay}) => (
  <div className="calendar">
    <Week start={1} selectDay={selectDay} />
    <Week start={8} selectDay={selectDay} />
    <Week start={15} selectDay={selectDay} />
    <Week start={22} selectDay={selectDay} />
  </div>
)
export default connect((state) => state, {selectDay})(Calendar)
