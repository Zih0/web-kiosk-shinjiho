import React, { useContext } from 'react'

import { RouteContext } from './Routes'

interface Props {
  to: string
  children: React.ReactNode
  className?: string
}

const Link = ({ className, to, children }: Props) => {
  const { movePath } = useContext(RouteContext)

  const preventReload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    window.history.pushState(to, '', to)
    movePath(to)
  }

  return (
    <a className={className} href={to} onClick={preventReload}>
      {children}
    </a>
  )
}

export default Link
