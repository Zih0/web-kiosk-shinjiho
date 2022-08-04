import { FC, useContext } from 'react'
import { InternationalizationContext } from 'src/contexts/InternationalizationContext'
import { CategoryType } from 'src/types/api/category'
import { ProductType } from 'src/types/api/product'
import styled from 'styled-components'
import Menu from '../Menu/Menu'

const DUMMY_DATA: CategoryType[] = [
  {
    id: 1,
    kr_name: '커피',
    en_name: 'coffee',
    products: [
      {
        id: 1,
        kr_name: '아메리카노',
        en_name: 'americano',
        price: 2800,
        option: {},
        thumbnail:
          'http://www.mmthcoffee.com/data/file/mm_coffee/thumb-3546841901_fWNqCpj8_143c53926bf1eab4f92bda344722234f830269e0_216x216.png',
        is_famous: false,
        is_soldout: false,
      },
      {
        id: 2,
        kr_name: '아몬드 아메리카노',
        en_name: 'almond americano',
        price: 3100,
        option: {},
        thumbnail:
          'http://www.mmthcoffee.com/data/file/mm_coffee/thumb-3546841901_1HBFIxl4_0d724e60d863d7144674ca4879dadb2604ef8371_216x216.png',
        is_famous: false,
        is_soldout: false,
      },
    ],
  },
]

interface Props {
  selected: number
}

const MenuList: FC<Props> = ({ selected }) => {
  const { language } = useContext(InternationalizationContext)

  const getFilteredMenuList = (selected: number) => {
    const categoryData = DUMMY_DATA.filter((category) => category.id === selected)

    if (categoryData.length) return categoryData[0].products
    return []
  }
  const menuList = getFilteredMenuList(selected) || []

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
