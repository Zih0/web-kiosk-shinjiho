import React, { FC } from 'react'
import styled from 'styled-components'

import useTranslation from 'src/hooks/useTranslation'

import Modal from './Modal'

interface Props {
  open: boolean
  onClose: () => void
}

const PaymentMethodModal: FC<Props> = ({ open, onClose }) => {
  const t = useTranslation('modal')
  return <Modal open={open} onClose={onClose} title={t('selectPaymentMethodTitle')}></Modal>
}

export default PaymentMethodModal

const CartListWrapper = styled.div``
