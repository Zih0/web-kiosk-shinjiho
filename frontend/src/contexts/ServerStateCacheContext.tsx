import { FC, createContext, useContext, useRef } from 'react'

type Cache = Record<string, any>

interface ServerStateCache {
  cache: Cache
  actions: {
    setCache: (key: string, data: any) => void
    remove: (key: string) => void
    clearCache: () => void
  }
}

export const ServerStateContext = createContext<ServerStateCache>({
  cache: {},
  actions: {
    setCache: () => {},
    remove: () => {},
    clearCache: () => {},
  },
})

interface Props {
  children: React.ReactNode
}

const ServerStateProvider: FC<Props> = ({ children }) => {
  const cacheRef = useRef<Cache>({ cache: {} })
  const actions = {
    setCache: (key: string, data: any) => {
      cacheRef.current.cache[key] = data
    },
    remove: (key: string) => {
      cacheRef.current.cache[key] = null
    },
    clearCache: () => {
      cacheRef.current.cache = {}
    },
  }

  return (
    <ServerStateContext.Provider
      value={{
        cache: cacheRef.current.cache,
        actions,
      }}
    >
      {children}
    </ServerStateContext.Provider>
  )
}

export const useServerState = () => {
  const value = useContext(ServerStateContext)

  return { cache: value.cache, ...value.actions }
}

export const useRemoveServerState = (key: string) => {
  const {
    actions: { remove },
  } = useContext(ServerStateContext)

  remove(key)
}

export const useClearServerStateCache = () => {
  const {
    actions: { clearCache },
  } = useContext(ServerStateContext)

  clearCache()
}

export default ServerStateProvider
