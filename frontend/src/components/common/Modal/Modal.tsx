import React, { FC } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'
import ModalLayout from './ModalLayout'

interface Props {
  open: boolean
  onClose?: () => void
  onSubmit?: () => void
  title?: string
  children?: React.ReactNode
  hasCloseButton?: boolean
  hasSubmitButton?: boolean
  closeText?: string
  submitText?: string
}

const Modal: FC<Props> = ({
  open,
  onClose,
  onSubmit,
  title,
  children,
  hasCloseButton,
  hasSubmitButton,
  closeText,
  submitText,
}) => {
  const submitCallback = () => {
    onSubmit && onSubmit()
    onClose && onClose()
  }

  return (
    <ModalLayout open={open}>
      <Wrapper>
        {title && <Title>{title}</Title>}
        <Content>{children}</Content>
        <ButtonWrapper>
          {hasCloseButton && (
            <Button width="full" onClick={onClose}>
              {closeText || '취소'}
            </Button>
          )}
          {hasSubmitButton && <Button width="full">{submitText || '확인'}</Button>}
        </ButtonWrapper>
      </Wrapper>
    </ModalLayout>
  )
}

export default Modal

const Wrapper = styled.div`
  padding: 90px 72px 64px 72px;
  min-height: 1058px;

  display: flex;
  flex-direction: column;

  border-radius: 24px;

  background-color: ${({ theme }) => theme.color.white};
`

const Title = styled.h3`
  font-weight: 700;
  font-size: 42px;
  line-height: 140%;

  text-align: center;

  color: ${({ theme }) => theme.color.black};
`

const Content = styled.div`
  flex: 1;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 52px;
`
