import { useState } from 'react'
import styled from 'styled-components'

import Cart from 'src/components/MainPage/Cart/Cart'
import CategoryTabs from 'src/components/MainPage/CategoryTabs/CategoryTabs'
import MenuList from 'src/components/MainPage/Menu/MenuList'
import Header from 'src/components/common/Header/Header'

const Main = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1)

  const onClickCategory = (id: number) => {
    setSelectedCategoryId(id)
  }

  return (
    <Wrapper>
      <Header />
      <CategoryTabs selected={selectedCategoryId} onClickCategory={onClickCategory} />
      <MenuListWrapper>
        <MenuList selected={selectedCategoryId} />
      </MenuListWrapper>
      <Cart />
    </Wrapper>
  )
}

export default Main

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  padding: 0 42px;
`

const MenuListWrapper = styled.div`
  margin-top: 60px;

  width: calc(100% + 20px);

  height: 894px;
  overflow-y: auto;

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
