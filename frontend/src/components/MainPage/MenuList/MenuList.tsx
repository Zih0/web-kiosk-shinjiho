import { AxiosError } from 'axios'
import { FC } from 'react'
import styled from 'styled-components'

import { getProductsAPI } from 'src/api/product/product'
import ErrorFallback from 'src/components/common/Error/ErrorFallback'
import { useCartAction } from 'src/contexts/CartContext'
import { useAxios } from 'src/hooks/useAxios'
import { useRouter } from 'src/lib/router/Routes'
import { ProductType } from 'src/types/api/product'

import MenuListSkeleton from './MenuListSkeleton'

import Menu from '../Menu/Menu'

interface Props {
  selected: number
}

const MenuList: FC<Props> = ({ selected }) => {
  const {
    isLoading,
    data: menuList,
    error,
  } = useAxios<ProductType[], AxiosError>(['menuList', selected], () => getProductsAPI(selected))
  const router = useRouter()
  const { clear } = useCartAction()
  const reset = () => {
    router('/')
    clear()
  }

  if (isLoading) return <MenuListSkeleton />

  if (error) return <ErrorFallback reset={reset} message={error.message} />

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
  height: 100%;

  display: grid;
  grid-template-columns: repeat(3, 312px);
  gap: 30px;
`
