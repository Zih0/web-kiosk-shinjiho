import { FC, useEffect } from 'react'
import styled from 'styled-components'

import useModal from 'src/hooks/useModal'

import { Image } from '../../Image/Image'
import PaymentLoader from '../../Loader/PaymentLoader'
import Modal from '../Modal'

const CARD_DELAY = 2000

interface Props {
  open: boolean
  onClose: () => void
}

const CardInputModal: FC<Props> = ({ open, onClose }) => {
  const { open: openLoader, onOpen: onOpenLoader, onClose: onCloseLoader } = useModal()

  useEffect(() => {
    if (!open) return

    setTimeout(() => {
      onOpenLoader()
      onClose()
    }, CARD_DELAY)
  }, [open])

  return (
    <>
      <Modal open={open} onClose={onClose} title="카드를 넣어주세요" hasCloseButton>
        <ImageWrapper>
          <Image name="imagePosMachine" width={526} height={526} />
        </ImageWrapper>
      </Modal>
      <PaymentLoader open={openLoader} onClose={onCloseLoader} paymentMethod="credit_card" />
    </>
  )
}

export default CardInputModal

const ImageWrapper = styled.div`
  margin-top: 74px;
`
