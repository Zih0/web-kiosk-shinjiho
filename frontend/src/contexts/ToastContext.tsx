import { FC, createContext, useState } from 'react'

const ToastContext = createContext<Map<number, string>>(new Map())

interface Props {
  children: React.ReactNode
  defaultTimeout?: number
}

const ToastProvider: FC<Props> = ({ children, defaultTimeout }) => {
  const [toastMap, setToastMap] = useState<Map<number, string>>(new Map())
  return <ToastContext.Provider value={toastMap}></ToastContext.Provider>
}
