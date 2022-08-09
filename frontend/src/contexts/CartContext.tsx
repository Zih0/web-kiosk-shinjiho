import { createContext, FC, useContext, useMemo, useRef, useState } from 'react'
import { ProductType } from 'src/types/api/product'

interface SelectedDetailOptionType {
  detailId: number
  detailKrName: string
  detailEnName: string
}

export type SelectedOptionType = Record<string, SelectedDetailOptionType>

export interface CartItemType extends Omit<ProductType, 'options' | 'is_famous' | 'is_soldout'> {
  cartId?: number
  count: number
  selectedOptions: SelectedOptionType
}

interface CartActionType {
  add: (cartItem: CartItemType) => void
  remove: (cartId: number) => void
  countUp(cartId: number): void
  countDown(cartId: number): void
}

export const CartContext = createContext<CartItemType[]>([])
export const CartActionContext = createContext<CartActionType>({
  add: () => {},
  remove: () => {},
  countUp: () => {},
  countDown: () => {},
})

export const MAX_COUNT = 9
export const MIN_COUNT = 1

interface Props {
  children: React.ReactNode
}

// TODO : 옵션에 따른 아이템 분기처리
const CartProvider: FC<Props> = ({ children }) => {
  const [cartList, setCartList] = useState<CartItemType[]>([])
  const idRef = useRef(0)

  const actions = useMemo(
    () => ({
      add(cartItem: CartItemType) {
        setCartList((prev) => {
          // 같은 상품, 같은 옵션 체크
          const hasSameMenu = prev.findIndex(
            (item) =>
              item.id === cartItem.id && JSON.stringify(item.selectedOptions) === JSON.stringify(item.selectedOptions),
          )

          if (hasSameMenu !== -1) {
            prev[hasSameMenu] = { ...prev[hasSameMenu], count: prev[hasSameMenu].count + cartItem.count }
            return [...prev]
          }

          const cartId = idRef.current++
          return [
            ...prev,
            {
              ...cartItem,
              cartId,
            },
          ]
        })
      },
      remove(cartId: number) {
        setCartList((prev) => prev.filter((item) => item.cartId !== cartId))
      },
      countUp(cartId: number) {
        setCartList((prev) =>
          prev.map((item) => {
            return item.cartId === cartId && item.count !== MAX_COUNT
              ? {
                  ...item,
                  count: item.count + 1,
                }
              : item
          }),
        )
      },
      countDown(cartId: number) {
        setCartList((prev) =>
          prev.map((item) =>
            item.cartId === cartId && item.count !== MIN_COUNT
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
