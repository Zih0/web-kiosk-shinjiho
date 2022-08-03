import { useContext } from 'react'
import { RouteContext } from './Routes'

interface Props {
  path: string
  component: JSX.Element
}

const Route = ({ path, component }: Props) => {
  const { path: currentPath } = useContext(RouteContext)

  return currentPath === path ? component : null
}

export default Route
