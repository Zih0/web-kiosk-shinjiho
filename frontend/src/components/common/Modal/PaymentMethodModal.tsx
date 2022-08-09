import { FC, useState } from 'react'
import styled from 'styled-components'

import { useCartSummary } from 'src/contexts/CartContext'
import useTranslation from 'src/hooks/useTranslation'

import CardInputModal from './CardInputModal'
import Modal from './Modal'

import Icon from '../Icon/Icon'

interface Props {
  open: boolean
  onClose: () => void
}

const PaymentMethodModal: FC<Props> = ({ open, onClose }) => {
  const t = useTranslation('modal')
  const { price } = useCartSummary()
  const [openCard, setOpenCard] = useState(false)

  const onCloseCardModal = () => {
    setOpenCard(false)
  }

  const onClickCard = () => {
    setOpenCard(true)
    onClose()
  }

  const onClickCash = () => {}

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={t('selectPaymentMethodTitle')}
        closeText={t('paymentCancelText')}
        hasCloseButton
      >
        <Wrapper>
          <TotalPrice>
            {t('totalPrice')} : <span className="price">{price}</span>
          </TotalPrice>
          <PaymentMethodWrapper>
            <PaymentItem onClick={onClickCard}>
              <Icon name="iconCreditCard" />
              <PaymentName>{t('creditCard')}</PaymentName>
            </PaymentItem>
            <PaymentItem onClick={onClickCash}>
              <Icon name="iconCash" />
              <PaymentName>{t('cash')}</PaymentName>
            </PaymentItem>
          </PaymentMethodWrapper>
        </Wrapper>
      </Modal>
      <CardInputModal open={openCard} onClose={onCloseCardModal} />
    </>
  )
}

export default PaymentMethodModal

const Wrapper = styled.div`
  width: 100%;
`

const TotalPrice = styled.h3`
  margin-top: 36px;
  font-weight: 600;
  font-size: 36px;
  line-height: 43px;

  text-align: center;

  ${({ theme }) => theme.color.black};

  .price {
    color: ${({ theme }) => theme.color.red};
  }
`

const PaymentMethodWrapper = styled.div`
  margin-top: 70px;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const PaymentItem = styled.button`
  width: 160px;
  height: 160px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 24px;
`

const PaymentName = styled.p`
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;

  color: ${({ theme }) => theme.color.black};
`
