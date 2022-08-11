export const fillZero = (number) => {
  return number < 10 ? `0${number}` : number
}
export const getTodayDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  return [year, fillZero(month), fillZero(date)].join('-')
}
