export const setDate = (obj) => {
  let year = obj.getFullYear()
  let month = obj.getMonth() + 1
  let day = obj.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  return year + '-' + month + '-' + day
}
