import React, { FC } from 'react'
import styled from 'styled-components'

import Button from '../Button/Button'

interface Props {
  reset: () => void
  message: string
}

const ErrorFallback: FC<Props> = ({ reset, message }) => {
  return (
    <Wrapper>
      {/* <ErrorMessage>{message}</ErrorMessage> */}
      <ErrorMessage>
        문제가 발생했습니다
        <br />
        다시 시도해주세요 🥲
      </ErrorMessage>
      <Button bgColor="red" onClick={reset}>
        초기 화면으로 돌아가기
      </Button>
    </Wrapper>
  )
}

export default ErrorFallback

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  background-color: ${({ theme }) => theme.color.white};
`

const ErrorMessage = styled.p`
  font-weight: 600;
  font-size: 32px;
  line-height: 46px;
  text-align: center;
`
