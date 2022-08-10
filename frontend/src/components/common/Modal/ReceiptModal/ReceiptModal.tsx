import React, { FC, useContext } from 'react'
import styled from 'styled-components'

import { useCartAction, useCartList } from 'src/contexts/CartContext'
import { InternationalizationContext } from 'src/contexts/InternationalizationContext'
import useTranslation from 'src/hooks/useTranslation'
import { useRouter } from 'src/lib/router/Routes'
import { priceToString } from 'src/utils/priceUtil'

import Modal from '../Modal'

interface Props {
  open: boolean
  onClose: () => void
  orderNumber: number
  paymentMethod: string
  paidAmount: number
  totalAmount: number
  changes: number
}

const ReceiptModal: FC<Props> = ({ open, onClose, orderNumber, paymentMethod, paidAmount, totalAmount, changes }) => {
  const { language } = useContext(InternationalizationContext)
  const t = useTranslation('modal')
  const router = useRouter()
  const cartList = useCartList()
  const { clear } = useCartAction()

  const onSubmit = () => {
    onClose()
    clear()
    router('/')
  }

  return (
    <Modal
      open={open}
      onSubmit={onSubmit}
      title={t('receiptTitle')}
      submitText={t('receiptSubmitText')}
      hasSubmitButton
    >
      <div>
        <OrderNumber>
          {t('orderNumber')} : {orderNumber}
        </OrderNumber>
        <OrderListWrapper>
          {cartList.map((cartItem) => (
            <React.Fragment key={cartItem.cartId}>
              <OrderItemWrapper>
                <OrderItemName>
                  {language === 'KR' && cartItem.kr_name}
                  {language === 'EN' && cartItem.en_name}
                </OrderItemName>
                <OrderItemCount>{cartItem.count}</OrderItemCount>
                <Price>{priceToString(cartItem.price * cartItem.count)}</Price>
              </OrderItemWrapper>
              <OrderItemOptionWrapper>
                {Object.values(cartItem.selectedOptions).map((option, idx) => (
                  <p key={option.detailId}>
                    {language === 'KR' && option.detailKrName}
                    {language === 'EN' && option.detailEnName}
                    <em className="delimiter">{idx !== Object.values(cartItem.selectedOptions).length - 1 && '/'}</em>
                  </p>
                ))}
              </OrderItemOptionWrapper>
            </React.Fragment>
          ))}
        </OrderListWrapper>
        <PaymentMethod>
          {t('paymentMethod')} : {paymentMethod}
        </PaymentMethod>
        <PriceSummaryWrapper>
          <PriceSummaryRow>
            <p>{t('inputCash')}</p>
            <p>{paidAmount}</p>
          </PriceSummaryRow>
          <PriceSummaryRow>
            <p>{t('totalPrice')}</p>
            <p>{totalAmount}</p>
          </PriceSummaryRow>
          <PriceSummaryRow>
            <p>{t('changes')}</p>
            <p>{changes}</p>
          </PriceSummaryRow>
        </PriceSummaryWrapper>
      </div>
    </Modal>
  )
}

export default ReceiptModal

const OrderNumber = styled.p`
  margin-top: 36px;

  font-weight: 600;
  font-size: 36px;
  line-height: 43px;
  text-align: center;

  color: ${({ theme }) => theme.color.black};
`

const OrderListWrapper = styled.div`
  margin-top: 80px;
  height: 300px;
  overflow-y: auto;
`

const OrderItemWrapper = styled.div`
  display: flex;
  align-items: center;

  font-weight: 600;
  font-size: 32px;
  line-height: 38px;
`

const OrderItemOptionWrapper = styled.div`
  margin-top: 8px;
  margin-bottom: 16px;

  display: flex;

  font-size: 24px;
  line-height: 28px;

  color: ${({ theme }) => theme.color.gray500};

  .delimiter {
    margin-left: 4px;
    margin-right: 4px;
  }
`

const OrderItemName = styled.p`
  width: 300px;
`

const OrderItemCount = styled.p`
  width: 42px;
  height: 38px;

  text-align: center;
`

const Price = styled.p`
  width: 149px;
  margin-right: 16px;
  text-align: end;
`

const PaymentMethod = styled.p`
  font-weight: 600;
  font-size: 28px;
  line-height: 33px;
  color: ${({ theme }) => theme.color.black};
`

const PriceSummaryWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const PriceSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 24px;
  line-height: 29px;
`
