import { useCallback, useEffect, useState } from 'react'
import { useServerState } from 'src/contexts/ServerStateCacheContext'

export const useAxios = <T, E>(key: string | string[], asyncFn: () => Promise<T>) => {
  const serverState = useServerState()
  const stringifiedKey = JSON.stringify(key)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<E | null>(null)
  const [data, setData] = useState<T | null>(null)

  const refetch = () => {
    serverState.remove(stringifiedKey)

    process()
  }

  const process = useCallback(async () => {
    if (serverState.cache[stringifiedKey]) {
      setData(serverState.cache[stringifiedKey])
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await asyncFn()
      serverState.setCache(stringifiedKey, response)
      setData(response)
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [stringifiedKey, asyncFn])

  useEffect(() => {
    process()
  }, [stringifiedKey])

  return { isLoading, error, data, refetch }
}
