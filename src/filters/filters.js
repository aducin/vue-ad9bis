import Vue from 'vue'
import Config from '../config'

Vue.filter('currency', (value) => {
  return value + Config.currency
})

Vue.filter('floatFixed', (value) => {
  let stringValue = String(value)
  let splitted = stringValue.split('.')
  if (!splitted[1]) {
    splitted[1] = '00'
  } else if (splitted[1].length === 1) {
    splitted[1] = splitted[1] + '0'
  }
  return splitted[0] + '.' + splitted[1]
})
