import styled, { keyframes } from 'styled-components'

import Portal from '../Portal/Portal'

// reference: https://codepen.io/search/pens?q=coffee+loading
const Loader = () => {
  return (
    <Portal>
      <Wrapper>
        <Dimmer />
        <CoffeeWrapper>
          <Coffee />
          <Text>Loading</Text>
        </CoffeeWrapper>
      </Wrapper>
    </Portal>
  )
}

export default Loader

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

const Dimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`

const fill = keyframes`
   100% {
      background-position: 0 -115px;
    }
`

const CoffeeWrapper = styled.div`
  z-index: 1001;
`

const Coffee = styled.div`
  height: 105px;
  width: 110px;
  border: 10px solid #606060;
  box-shadow: 0 0 0 10px white;
  margin: auto;
  position: relative;
  border-radius: 0 0 110px 110px;
  background-image: linear-gradient(
    0deg,
    ${({ theme }) => theme.color.gray100} 110px,
    transparent 110px,
    transparent 230px
  );
  background-size: 230px 230px;
  background-position: 0 0;
  animation: ${fill} 2s infinite;

  &:before {
    position: absolute;
    content: '';
    height: 40px;
    width: 25px;
    border: 10px solid white;
    border-radius: 0 40px 40px 0;
    right: -55px;
  }
`

const Text = styled.p`
  margin-top: 24px;
  font-weight: 700;
  font-size: 36px;
  letter-spacing: 2.2px;
  color: ${({ theme }) => theme.color.white};
`
