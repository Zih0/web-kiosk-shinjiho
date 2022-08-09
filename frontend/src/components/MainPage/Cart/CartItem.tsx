import { FC, useContext } from 'react'
import styled from 'styled-components'

import { Image } from 'src/components/common/Image/Image'
import { CartItemType, MAX_COUNT, MIN_COUNT, useCartAction } from 'src/contexts/CartContext'
import { InternationalizationContext } from 'src/contexts/InternationalizationContext'
import Icon from 'src/components/common/Icon/Icon'

interface Props {
  cartItem: CartItemType
}

const CartItem: FC<Props> = ({ cartItem }) => {
  const { language } = useContext(InternationalizationContext)
  const { remove, countUp, countDown } = useCartAction()

  const onClickXButton = () => {
    remove(cartItem.cartId!)
  }

  const onClickPlus = () => {
    countUp(cartItem.cartId!)
  }

  const onClickMinus = () => {
    countDown(cartItem.cartId!)
  }

  return (
    <Wrapper>
      <RemoveIcon name="iconCircleX" size={40} onClick={onClickXButton} />
      <Image src={cartItem.thumbnail} width={120} height={120} />
      <ProductName>
        {language === 'KR' && cartItem.kr_name}
        {language === 'EN' && cartItem.en_name}
      </ProductName>
      <CountWrapper>
        <Icon
          name="iconCircleMinus"
          onClick={onClickMinus}
          strokeColor={cartItem.count === MIN_COUNT ? 'gray300' : 'black'}
        />
        <Count>{cartItem.count}</Count>
        <Icon
          name="iconCirclePlus"
          onClick={onClickPlus}
          strokeColor={cartItem.count === MAX_COUNT ? 'gray300' : 'black'}
        />
      </CountWrapper>
    </Wrapper>
  )
}

export default CartItem

const Wrapper = styled.div`
  position: relative;
  width: 160px;
  height: 200px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${({ theme }) => theme.color.gray100};
  border-radius: 24px;
`

const ProductName = styled.p`
  margin-top: 4px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.color.black};
`

const CountWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  gap: 20px;
`

const Count = styled.p`
  font-weight: 600;
  font-size: 32px;
  line-height: 38px;

  color: ${({ theme }) => theme.color.black};
`

const RemoveIcon = styled(Icon)`
  position: absolute;
  top: 4px;
  right: 4px;
`
