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

export const fadeIn = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`

export const fadeOut = keyframes`
  from {
    opacity:1;
  }
  to {
    opacity:0;
  }
`

const ToastWrapper = styled.div<{ status: ToastStatus; visible: boolean }>`
  padding: 24px 30px;

  font-size: 30px;

  color: white;
  background-color: ${({ status }) => (status === 'success' ? 'green' : 'red')};

  border-radius: 4px;

  ${({ visible }) =>
    css`
      animation: ${visible ? fadeIn : fadeOut} 0.4s forwards;
    `};
`
