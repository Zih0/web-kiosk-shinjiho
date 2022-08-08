import styled from 'styled-components'
import Button from 'src/components/common/Button/Button'
import { useCartList, useCartSummary } from 'src/contexts/CartContext'
import useTranslation from 'src/hooks/useTranslation'
import { useRouter } from 'src/lib/router/Routes'
import { priceToString } from 'src/utils/priceUtil'
import CartItem from './CartItem'

const Cart = () => {
  const t = useTranslation('main')
  const cartList = useCartList()
  const { count, price } = useCartSummary()
  const router = useRouter()

  const onClickCancelButton = () => {
    router('/')
  }

  return (
    <Wrapper>
      <CartListWrapper>
        {cartList.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </CartListWrapper>
      <CartListSummaryWrapper>
        <CartListCount>
          {t('totalCount')} : {count}
        </CartListCount>
        <CartListPrice>
          {t('price')} : <span className="price">{priceToString(price)}</span>
        </CartListPrice>
      </CartListSummaryWrapper>
      <ButtonWrapper>
        <Button bgColor="black" onClick={onClickCancelButton}>
          {t('cancel')}
        </Button>
        <Button width="340px" bgColor="red">
          {t('order')}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default Cart

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 525px;

  padding: 32px 42px;

  background: ${({ theme }) => theme.color.gray800};
  border-radius: 24px 24px 0px 0px;
`

const CartListWrapper = styled.div`
  min-height: 200px;
  display: flex;
  gap: 24px;
`

const CartListSummaryWrapper = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ButtonWrapper = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CartListCount = styled.p`
  font-weight: 600;
  font-size: 32px;
  line-height: 38px;

  color: ${({ theme }) => theme.color.white};
`

const CartListPrice = styled.p`
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;

  color: ${({ theme }) => theme.color.white};

  .price {
    color: ${({ theme }) => theme.color.red};
  }
`
