import { FC } from 'react'
import styled from 'styled-components'

import { getProductsAPI } from 'src/api/product/product'
import { useAxios } from 'src/hooks/useAxios'
import { ProductType } from 'src/types/api/product'

import MenuListSkeleton from './MenuListSkeleton'

import Menu from '../Menu/Menu'

interface Props {
  selected: number
}

const MenuList: FC<Props> = ({ selected }) => {
  const { isLoading, data: menuList } = useAxios(['menuList', selected], () => getProductsAPI(selected))

  if (isLoading) return <MenuListSkeleton />

  return (
    <Wrapper>
      {menuList?.map((product: ProductType) => (
        <Menu
          key={product.id}
          id={product.id}
          krName={product.kr_name}
          enName={product.en_name}
          price={product.price}
          imgUrl={product.thumbnail}
          options={product.options}
        />
      ))}
    </Wrapper>
  )
}

export default MenuList

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
