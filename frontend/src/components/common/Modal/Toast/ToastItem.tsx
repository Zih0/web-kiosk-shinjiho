import React, { FC, useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

import { ToastStatus, useToastFactory } from 'src/contexts/ToastContext'

interface Props {
  id: number
  status: ToastStatus
  message: string
  timeout: number
}

const ToastItem: FC<Props> = ({ id, status, message, timeout }) => {
  const toastRef = useRef<HTMLDivElement>(null)
  const { removeToast } = useToastFactory()

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (visible || !toastRef.current) return

    const deleteToast = () => {
      removeToast(id)
    }

    const toastWrapper = toastRef.current

    toastWrapper.addEventListener('animationend', deleteToast)

    return () => {
      toastWrapper.removeEventListener('animationend', deleteToast)
    }
  }, [toastRef, visible])

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, timeout)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <ToastWrapper ref={toastRef} status={status} visible={visible}>
      {message}
    </ToastWrapper>
  )
}

export default ToastItem

const ToastWrapper = styled.div<{ status: ToastStatus; visible: boolean }>`
  padding: 24px 30px;

  font-size: 30px;

  color: white;
  background-color: ${({ status, theme }) => (status === 'success' ? theme.color.success : theme.color.error)};

  border-radius: 4px;

  ${({ visible, theme }) =>
    css`
      animation: ${visible ? theme.animation.fadeIn : theme.animation.fadeOut} 0.4s forwards;
    `};
`
