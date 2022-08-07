import { useCallback, useEffect, useState } from 'react'

export const useAxios = <T, E>(asyncFn: () => Promise<T>) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<E | null>(null)
  const [data, setData] = useState<T | null>(null)

  const process = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await asyncFn()
      setData(response)
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [asyncFn])

  useEffect(() => {
    process()
  }, [process])

  return { loading, error, data }
}
