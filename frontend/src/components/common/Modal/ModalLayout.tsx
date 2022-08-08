import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import Portal from '../Portal/Portal'

interface Props {
  open: boolean
  children?: React.ReactNode
  onClose?: VoidFunction
}

const ModalLayout: FC<Props> = ({ open, children, onClose }) => {
  const dimRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  // animation을 위한 state
  const [animationTrigger, setAnimationTrigger] = useState(open)

  useEffect(() => {
    if (open && !animationTrigger) setAnimationTrigger(true)
  }, [open, animationTrigger])

  const onAnimationEnd = useCallback(() => {
    if (!open && animationTrigger) setAnimationTrigger(false)
  }, [open, animationTrigger])

  useEffect(() => {
    if (!dimRef.current || !contentRef.current) return

    const dimmer = dimRef.current
    const content = contentRef.current

    dimmer.addEventListener('animationend', onAnimationEnd)
    content.addEventListener('animationend', onAnimationEnd)

    return () => {
      dimmer && dimmer.removeEventListener('animationend', onAnimationEnd)
      content && content.removeEventListener('animationend', onAnimationEnd)
    }
  }, [contentRef, dimRef, onAnimationEnd])

  if (!animationTrigger) return null

  return (
    <Portal>
      <Wrapper open={open}>
        <Dimmer ref={dimRef} open={open} onClick={onClose} />
        <Content ref={contentRef} open={open}>
          {children}
        </Content>
      </Wrapper>
    </Portal>
  )
}

export default ModalLayout

const Wrapper = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  z-index: 1000;
`

export const slideUp = keyframes`
  from {
    opacity:0;
    transform: translateY(20px);
  }
  to {
    opacity:1;
    transform: translateY(0);
  }
`

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

const Dimmer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;

  ${({ open }) =>
    css`
      animation: ${open ? fadeIn : fadeOut} 0.3s forwards;
    `};
`

const Content = styled.div<{ open: boolean }>`
  z-index: 1000;

  ${({ open }) =>
    css`
      animation: ${open ? slideUp : fadeOut} 0.3s forwards;
    `};
`
