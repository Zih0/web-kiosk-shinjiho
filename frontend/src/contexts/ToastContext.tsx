import { FC, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

export type ToastStatus = 'success' | 'error'

interface ToastType {
  id: number
  message: string
  status: ToastStatus
  timeout: number
}

interface ToastOptionType {
  timeout?: number
}

const ToastContext = createContext<{ toastList: ToastType[]; removeToast: (id: number) => void }>({
  toastList: [],
  removeToast: () => {},
})
const ToastActionContext = createContext({
  success: (message: string, options?: ToastOptionType) => {},
  error: (message: string, options?: ToastOptionType) => {},
})

interface Props {
  children: React.ReactNode
  defaultTimeout?: number
}

const ToastProvider: FC<Props> = ({ children, defaultTimeout = 2000 }) => {
  const [toastList, setToastList] = useState<ToastType[]>([])
  const idRef = useRef(0)

  const addToast = (message: string, status: ToastStatus, options?: ToastOptionType) => {
    const toastId = idRef.current++

    const newToast = {
      id: toastId,
      message,
      status,
      timeout: options?.timeout ?? defaultTimeout,
    }

    setToastList((prev) => [newToast, ...prev])
  }

  const removeToast = (id: number) => {
    setToastList((prev) => prev.filter((item) => item.id !== id))
  }

  const actions = useMemo(
    () => ({
      success: (message: string, options?: ToastOptionType) => addToast(message, 'success', options),
      error: (message: string, options?: ToastOptionType) => addToast(message, 'error', options),
    }),
    [],
  )

  return (
    <ToastActionContext.Provider value={actions}>
      <ToastContext.Provider value={{ toastList, removeToast }}>{children}</ToastContext.Provider>
    </ToastActionContext.Provider>
  )
}

export const useToastFactory = () => {
  const value = useContext(ToastContext)

  return value
}

export const useToast = () => {
  const toast = useContext(ToastActionContext)

  return toast
}

export default ToastProvider
