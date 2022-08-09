import { useState } from 'react'

export const MIN_COUNT = 1
export const MAX_COUNT = 9

const useCount = () => {
  const [count, setCount] = useState(MIN_COUNT)
  const isMinCount = count === MIN_COUNT
  const isMaxCount = count === MAX_COUNT

  const decreaseCount = () => {
    if (count === MIN_COUNT) return

    setCount((prev) => prev - 1)
  }

  const increaseCount = () => {
    if (count === MAX_COUNT) return

    setCount((prev) => prev + 1)
  }

  return { count, increaseCount, decreaseCount, isMaxCount, isMinCount }
}

export default useCount
