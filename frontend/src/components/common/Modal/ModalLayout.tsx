import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import Portal from '../Portal/Portal'

interface Props {
  open: boolean
  children?: React.ReactNode
  onClose?: () => void
  backgroundLock?: boolean
}

const ModalLayout: FC<Props> = ({ open, children, onClose, backgroundLock = false }) => {
  const dimRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  // animation을 위한 state
  const [animationTrigger, setAnimationTrigger] = useState(open)

  const onClickDimmer = () => {
    if (!backgroundLock && onClose) {
      onClose()
    }
  }

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
      <Wrapper>
        <Dimmer ref={dimRef} open={open} onClick={onClickDimmer} />
        <Content ref={contentRef} open={open}>
          {children}
        </Content>
      </Wrapper>
    </Portal>
  )
}

export default ModalLayout

const Wrapper = styled.div`
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

const Dimmer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;

  ${({ open, theme }) =>
    css`
      animation: ${open ? theme.animation.fadeIn : theme.animation.fadeOut} 0.4s forwards;
    `};
`

const Content = styled.div<{ open: boolean }>`
  z-index: 1000;

  ${({ open, theme }) =>
    css`
      animation: ${open ? theme.animation.slideUp : theme.animation.fadeOut} 0.4s forwards;
    `};
`
