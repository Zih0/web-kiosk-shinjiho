export const priceToString = (price: number | string) => {
  if (typeof price === 'string') price = +price
  return price.toLocaleString()
}
