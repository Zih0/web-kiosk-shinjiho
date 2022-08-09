import React, { FC } from 'react'

import useTranslation from 'src/hooks/useTranslation'

import Modal from './Modal'

interface Props {
  open: boolean
  onClose: () => void
}

const OrderConfirmModal: FC<Props> = ({ open, onClose }) => {
  const t = useTranslation('modal')

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('confirmOrderTitle')}
      closeText={t('confirmOrderCancelText')}
      submitText={t('confirmOrderSubmitText')}
      hasCloseButton
      hasSubmitButton
    ></Modal>
  )
}

export default OrderConfirmModal
