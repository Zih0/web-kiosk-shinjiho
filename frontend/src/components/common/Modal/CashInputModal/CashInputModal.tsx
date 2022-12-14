import { FC, useState } from 'react'
import styled from 'styled-components'

import { useCartSummary } from 'src/contexts/CartContext'
import { useToast } from 'src/contexts/ToastContext'
import useModal from 'src/hooks/useModal'
import useTranslation from 'src/hooks/useTranslation'
import { priceToString } from 'src/utils/priceUtil'

import PaymentLoader from '../../Loader/PaymentLoader'
import Modal from '../Modal'

const CASH_LIST: number[] = [500, 1000, 5000, 10000]

interface Props {
  open: boolean
  onClose: () => void
}

const CashInputModal: FC<Props> = ({ open, onClose }) => {
  const t = useTranslation('modal')
  const toast = useToast()
  const { price } = useCartSummary()
  const [cash, setCash] = useState(0)
  const { open: openLoader, onOpen: onOpenLoader, onClose: onCloseLoader } = useModal()

  const onClickCashButton = (inputCash: number) => {
    if (price * 2 < cash) {
      toast.error(t('exceededAmountErrorToast'))
      return
    }
    setCash((prev) => prev + inputCash)
  }

  const onSubmit = () => {
    if (price > cash) {
      toast.error(t('lackCashErrorToast'))
      return
    }
    onClose()
    onOpenLoader()
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        onSubmit={onSubmit}
        title={t('inputCashTitle')}
        closeText={t('inputCashCancelText')}
        submitText={t('inputCashSubmitText')}
        hasCloseButton
        hasSubmitButton
      >
        <Wrapper>
          <PriceWrapper>
            <PriceRow>
              <p>{t('totalPrice')} : </p>
              <p className="price">{priceToString(price)}</p>
            </PriceRow>
            <PriceRow>
              <p>{t('inputCash')} : </p>
              <p className="price">{priceToString(cash)}</p>
            </PriceRow>
          </PriceWrapper>
          <ButtonWrapper>
            {CASH_LIST.map((cash) => (
              <CashButton key={cash} onClick={() => onClickCashButton(cash)}>
                {priceToString(cash)}
              </CashButton>
            ))}
          </ButtonWrapper>
        </Wrapper>
      </Modal>
      <PaymentLoader open={openLoader} onClose={onCloseLoader} paymentMethod="cash" paidAmount={cash} />
    </>
  )
}

export default CashInputModal

const Wrapper = styled.div`
  width: 100%;
`

const PriceWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${({ theme }) => theme.color.black};

  font-weight: 600;
  font-size: 36px;
  line-height: 43px;

  .price {
    font-weight: 700;
    color: ${({ theme }) => theme.color.red};
  }
`

const ButtonWrapper = styled.div`
  margin-top: 48px;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 20px;
  place-items: center;
`

const CashButton = styled.button`
  width: 200px;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;
  font-size: 32px;
  line-height: 38px;

  background-color: ${({ theme }) => theme.color.gray100};

  border-radius: 24px;
`
