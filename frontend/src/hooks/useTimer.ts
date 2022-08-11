import { useEffect, useState } from 'react'

const TIME = 30

const useTimer = (reset: () => void) => {
  const [time, setTime] = useState(TIME)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (time === 0) {
      reset()
    }

    const resetTime = () => {
      setTime(TIME)
    }

    window.addEventListener('pointerdown', resetTime)
    return () => {
      window.removeEventListener('pointerdown', resetTime)
    }
  }, [time])

  return { time }
}

export default useTimer
