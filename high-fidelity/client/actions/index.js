/* @flow */
import at from '../action-types.js'

export const selectDay = (num: number) => ({
  type: at.SELECT_DAY,
  payload: num,
})
