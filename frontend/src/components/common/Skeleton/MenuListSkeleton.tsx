import styled from 'styled-components'

import MenuSkeleton from './MenuSkeleton'

const MenuListSkeleton = () => {
  return (
    <Wrapper>
      <MenuSkeleton />
      <MenuSkeleton />
      <MenuSkeleton />
      <MenuSkeleton />
      <MenuSkeleton />
      <MenuSkeleton />
    </Wrapper>
  )
}

export default MenuListSkeleton

const Wrapper = styled.div`
  width: calc(100% + 20px);
  margin-top: 60px;

  height: 894px;

  overflow-y: auto;

  display: grid;
  grid-template-columns: repeat(3, 312px);
  gap: 30px;

  &::-webkit-scrollbar {
    width: 10px;
    background-color: ${({ theme }) => theme.color.gray100};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.gray500};
    border-radius: 8px;
  }
`
