import { useState } from 'react'
import Header from 'src/components/common/Header/Header'
import Cart from 'src/components/MainPage/Cart/Cart'
import CategoryTabs from 'src/components/MainPage/CategoryTabs/CategoryTabs'
import MenuList from 'src/components/MainPage/MenuList/MenuList'
import styled from 'styled-components'

const Main = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1)

  const onClickCategory = (id: number) => {
    setSelectedCategoryId(id)
  }

  return (
    <Wrapper>
      <Header />
      <CategoryTabs selected={selectedCategoryId} onClickCategory={onClickCategory} />
      <MenuList selected={selectedCategoryId} />
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
