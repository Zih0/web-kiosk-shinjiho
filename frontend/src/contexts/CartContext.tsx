import { FC, createContext, useContext, useMemo, useRef, useState } from 'react'

import { ProductType } from 'src/types/api/product'

export interface CartItemType extends Omit<ProductType, 'options' | 'is_famous' | 'is_soldout'> {
  cartId?: number
  count: number
}

interface CartActionType {
  add: (cartItem: CartItemType) => void
  remove: (id: number) => void
  countUp(id: number): void
  countDown(id: number): void
}

export const CartContext = createContext<CartItemType[]>([])
export const CartActionContext = createContext<CartActionType>({
  add: () => {},
  remove: () => {},
  countUp: () => {},
  countDown: () => {},
})

const MAX_COUNT = 10
const MIN_COUNT = 1

interface Props {
  children: React.ReactNode
}

// TODO : 옵션에 따른 아이템 분기처리
const CartProvider: FC<Props> = ({ children }) => {
  const [cartList, setCartList] = useState<CartItemType[]>([])
  const idRef = useRef(0)

  const actions = useMemo(
    () => ({
      // TODO : 옵션에 따른 아이템 분기처리
      add(cartItem: CartItemType) {
        const cartId = idRef.current++
        setCartList((prev) => [
          ...prev,
          {
            ...cartItem,
            cartId,
          },
        ])
      },
      // TODO : 옵션에 따른 아이템 분기처리
      remove(id: number) {
        setCartList((prev) => prev.filter((item) => item.id !== id))
      },
      countUp(id: number) {
        setCartList((prev) =>
          prev.map((item) =>
            item.id === id && item.count < MAX_COUNT
              ? {
                  ...item,
                  count: item.count + 1,
                }
              : item,
          ),
        )
      },
      countDown(id: number) {
        setCartList((prev) =>
          prev.map((item) =>
            item.id === id && item.count > MIN_COUNT
              ? {
                  ...item,
                  count: item.count - 1,
                }
              : item,
          ),
        )
      },
    }),
    [],
  )

  return (
    <CartActionContext.Provider value={actions}>
      <CartContext.Provider value={cartList}>{children}</CartContext.Provider>
    </CartActionContext.Provider>
  )
}

export const useCartList = () => {
  const value = useContext(CartContext)

  return value
}

export const useCartSummary = () => {
  const value = useContext(CartContext)

  const count = value.reduce((acc, item) => acc + item.count, 0)
  const price = value.reduce((acc, item) => acc + item.price * item.count, 0)
  return {
    count,
    price,
  }
}

export const useCartAction = () => {
  const value = useContext(CartActionContext)

  return value
}

export default CartProvider
