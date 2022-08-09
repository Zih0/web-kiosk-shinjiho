import React, { FC, useContext } from 'react'
import styled from 'styled-components'

import { CartItemType, MAX_COUNT, MIN_COUNT, useCartAction, useCartList } from 'src/contexts/CartContext'
import { InternationalizationContext } from 'src/contexts/InternationalizationContext'
import useModal from 'src/hooks/useModal'
import useTranslation from 'src/hooks/useTranslation'

import Modal from './Modal'
import PaymentMethodModal from './PaymentMethodModal'

import Icon from '../Icon/Icon'

interface Props {
  open: boolean
  onClose: () => void
}

const OrderConfirmModal: FC<Props> = ({ open, onClose }) => {
  const t = useTranslation('modal')
  const { language } = useContext(InternationalizationContext)
  const cartList = useCartList()
  const {
    open: openPaymentMethodModal,
    onClose: onClosePaymentMethodModal,
    onOpen: onOpenPaymentMethodModal,
  } = useModal()

  const { remove, countUp, countDown } = useCartAction()

  const onClickXButton = (cartItem: CartItemType) => {
    remove(cartItem.cartId!)
  }

  const onClickPlus = (cartItem: CartItemType) => {
    countUp(cartItem.cartId!)
  }

  const onClickMinus = (cartItem: CartItemType) => {
    countDown(cartItem.cartId!)
  }

  const onSubmit = () => {
    onOpenPaymentMethodModal()
    onClose()
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        onSubmit={onSubmit}
        title={t('confirmOrderTitle')}
        closeText={t('confirmOrderCancelText')}
        submitText={t('confirmOrderSubmitText')}
        hasCloseButton
        hasSubmitButton
      >
        <Wrapper>
          {cartList.map((cartItem) => (
            <OrderItemWrapper key={cartItem.cartId}>
              <OrderItemName>
                {language === 'KR' && cartItem.kr_name}
                {language === 'EN' && cartItem.en_name}
              </OrderItemName>
              <OrderItemCountWrapper>
                <Icon
                  name="iconCircleMinus"
                  size={32}
                  onClick={() => onClickMinus(cartItem)}
                  strokeColor={cartItem.count === MIN_COUNT ? 'gray300' : 'black'}
                />
                <p>{cartItem.count}</p>
                <Icon
                  name="iconCirclePlus"
                  size={32}
                  onClick={() => onClickPlus(cartItem)}
                  strokeColor={cartItem.count === MAX_COUNT ? 'gray300' : 'black'}
                />
              </OrderItemCountWrapper>
              <Price>{cartItem.price * cartItem.count}</Price>
              <Icon name="iconCircleXLine" size={32} onClick={() => onClickXButton(cartItem)} />
            </OrderItemWrapper>
          ))}
        </Wrapper>
      </Modal>
      <PaymentMethodModal open={openPaymentMethodModal} onClose={onClosePaymentMethodModal} />
    </>
  )
}

export default OrderConfirmModal

const Wrapper = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const OrderItemWrapper = styled.div`
  display: flex;
  align-items: center;

  font-weight: 600;
  font-size: 32px;
  line-height: 38px;
`

const OrderItemName = styled.p`
  width: 300px;
`

const OrderItemCountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  p {
    width: 42px;
    height: 38px;

    text-align: center;
  }
`

const Price = styled.p`
  width: 149px;
  margin-right: 16px;
  text-align: end;
`
