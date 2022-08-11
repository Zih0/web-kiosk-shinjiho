import { useCallback, useState } from 'react'

import { MAX_COUNT, MIN_COUNT } from 'src/constants/cart'

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
