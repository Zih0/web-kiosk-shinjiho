import React from 'react'
import styled from 'styled-components'

const Cart = () => {
  return <Wrapper></Wrapper>
}

export default Cart

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 525px;

  padding: 32px 42px;

  background: ${({ theme }) => theme.color.gray800};
  border-radius: 24px 24px 0px 0px;
`
