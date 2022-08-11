import React from 'react'
import styled, { keyframes } from 'styled-components'

const MenuSkeleton = () => {
  return (
    <Wrapper>
      <ImageSkeleton />
      <MenuNameSkeleton />
      <MenuPriceSkeleton />
    </Wrapper>
  )
}

export default MenuSkeleton

const Wrapper = styled.div`
  position: relative;
  padding: 45px 44px;

  width: 312px;
  height: 432px;

  display: flex;
  flex-direction: column;

  align-items: center;

  background: ${({ theme }) => theme.color.gray100};
  border-radius: 24px;

  *:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100%;
    background: ${({ theme }) => `linear-gradient(to right, ${theme.color.gray200}, #ddd,${theme.color.gray200})`};
    animation: ${({ theme }) => theme.animation.skeletonLoading} 1.5s infinite linear;
  }

  &,
  * {
    position: relative;
    overflow: hidden;
  }
`

const ImageSkeleton = styled.div`
  width: 216px;
  height: 216px;

  border-radius: 24px;

  background-color: ${({ theme }) => theme.color.gray200};
`

const MenuNameSkeleton = styled.div`
  position: absolute;
  bottom: 98px;

  width: 137px;
  height: 45px;

  border-radius: 4px;

  background-color: ${({ theme }) => theme.color.gray200};
`

const MenuPriceSkeleton = styled.div`
  position: absolute;
  bottom: 44px;

  width: 110px;
  height: 45px;

  border-radius: 4px;

  background-color: ${({ theme }) => theme.color.gray200};
`
