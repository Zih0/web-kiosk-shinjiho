import { FC, useContext, useEffect, useState } from 'react'
import { getProductsAPI } from 'src/api/product/product'
import { InternationalizationContext } from 'src/contexts/InternationalizationContext'

import { ProductType } from 'src/types/api/product'
import styled from 'styled-components'
import Menu from '../Menu/Menu'

interface Props {
  selected: number
}

const MenuList: FC<Props> = ({ selected }) => {
  const { language } = useContext(InternationalizationContext)
  const [menuList, setMenuList] = useState<ProductType[]>([])

  const getMenuList = async (selected: number) => {
    const data = await getProductsAPI(selected)
    setMenuList(data)
  }

  useEffect(() => {
    getMenuList(selected)
  }, [selected])

  return (
    <Wrapper>
      {menuList &&
        menuList.map((product: ProductType) => (
          <Menu
            key={product.id}
            id={product.id}
            name={language === 'KR' ? product.kr_name : language === 'EN' ? product.en_name : ''}
            price={product.price}
            imgUrl={product.thumbnail}
            option={product.option}
          />
        ))}
    </Wrapper>
  )
}

export default MenuList

const Wrapper = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`
