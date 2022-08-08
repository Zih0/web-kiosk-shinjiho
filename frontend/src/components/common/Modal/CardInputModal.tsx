import React, { FC } from 'react'
import styled from 'styled-components'
import { Image } from '../Image/Image'
import Modal from './Modal'

interface Props {
  open: boolean
  onClose?: VoidFunction
}

const CardInputModal: FC<Props> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} title="카드를 넣어주세요" hasCloseButton>
      <ImageWrapper>
        <Image name="imagePosMachine" width={526} height={526} />
      </ImageWrapper>
    </Modal>
  )
}

export default CardInputModal

const ImageWrapper = styled.div`
  margin-top: 74px;
`
