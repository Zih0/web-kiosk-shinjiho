import { useEffect, useState } from 'react'

import { useCartAction } from 'src/contexts/CartContext'
import { useRouter } from 'src/lib/router/Routes'

const TIME = 30

const useTimer = () => {
  const router = useRouter()
  const { clear } = useCartAction()
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
      router('/')
      clear()
    }

    const resetTime = () => {
      setTime(TIME)
    }

    window.addEventListener('mouseup', resetTime)
    return () => {
      window.removeEventListener('mouseup', resetTime)
    }
  }, [time])

  return { time }
}

export default useTimer
