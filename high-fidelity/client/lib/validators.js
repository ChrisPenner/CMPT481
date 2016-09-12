/* @flow */
import R from 'ramda'
export const phoneNumber = R.compose(
  R.replace(/[^-+0-9\s()]/g, ''),
  R.defaultTo('')
)
