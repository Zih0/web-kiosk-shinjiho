import { useCallback, useState } from 'react'

export const MIN_COUNT = 1
export const MAX_COUNT = 9

const useCount = () => {
  const [count, setCount] = useState(MIN_COUNT)
  const isMinCount = count === MIN_COUNT
  const isMaxCount = count === MAX_COUNT

  const decreaseCount = useCallback(() => {
    if (count === MIN_COUNT) return

    setCount((prev) => prev - 1)
  }, [count])

  const increaseCount = useCallback(() => {
    if (count === MAX_COUNT) return

    setCount((prev) => prev + 1)
  }, [count])

  const initCount = useCallback(() => {
    setCount(MIN_COUNT)
  }, [])

  return { count, increaseCount, decreaseCount, initCount, isMaxCount, isMinCount }
}

export default useCount
