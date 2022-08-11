import { FC, createContext, useContext, useEffect, useMemo, useState } from 'react'

interface Route {
  path: string
  movePath: (newPath: string) => void
}

export const RouteContext = createContext<Route>({
  path: '',
  movePath: () => {},
})

interface Props {
  children: React.ReactNode
}

const RouteProvider: FC<Props> = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname)

  const movePath = (newPath: string) => {
    setPath(newPath)
  }

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      setPath(e.state || '/')
    }

    window.addEventListener('popstate', onPopState)

    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  return (
    <RouteContext.Provider
      value={{
        path,
        movePath,
      }}
    >
      {children}
    </RouteContext.Provider>
  )
}

export const useRouter = () => {
  const { movePath } = useContext(RouteContext)

  return (to: string) => {
    window.history.pushState(to, '', to)
    movePath(to)
  }
}

export { RouteProvider as Routes }
