export const floatNumber = (value) => {
  return !isNaN(value.replace(',', '.'))
}
