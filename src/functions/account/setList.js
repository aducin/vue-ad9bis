import { sortList } from '../sort'

export const setList = (list, sortBy, ascending, options) => {
  let finalList = list.map(el => {
    el.amountFloat = parseFloat(el.amount)
    el.cashTime = el.cashTime ? el.cashTime : null
    el.receiptTime = el.receiptTime ? el.receiptTime : null
    el.cashTimeData = el.cashTime ? new Date(el.cashTime) : null
    el.receiptTimeData = el.receiptTime ? new Date(el.receiptTime) : null
    let indexCheck = options.types.findIndex(innerEl => parseInt(el.type) === parseInt(innerEl.value))
    if (indexCheck !== -1) {
      el.typeName = options.types[indexCheck].text
    }
    return el
  })
  return sortList(finalList, sortBy, ascending)
}
