import React, { FC } from 'react'
import styled from 'styled-components'

import { useLanguage } from 'src/contexts/InternationalizationContext'
import { priceToString } from 'src/utils/priceUtil'

import Icon from '../../Icon/Icon'
import Image from '../../Image/Image'

interface Props {
  imgUrl: string
  krName: string
  enName: string
  price: number
  extraPrice: number
  count: number
  isMinCount: boolean
  isMaxCount: boolean
  onClickMinus: () => void
  onClickPlus: () => void
}

const ProductSummary: FC<Props> = ({
  imgUrl,
  krName,
  enName,
  price,
  extraPrice,
  count,
  isMaxCount,
  isMinCount,
  onClickMinus,
  onClickPlus,
}) => {
  const language = useLanguage()

  return (
    <>
      <Image src={imgUrl} width={224} height={224} />
      <ProductName>
        {language === 'KR' && krName}
        {language === 'EN' && enName}
      </ProductName>
      <ProductPrice>{priceToString((price + extraPrice) * count)}</ProductPrice>
      <CountWrapper>
        <Icon name="iconCircleMinus" size={36} onClick={onClickMinus} strokeColor={isMinCount ? 'gray300' : 'black'} />
        <span>{count}</span>
        <Icon name="iconCirclePlus" size={36} onClick={onClickPlus} strokeColor={isMaxCount ? 'gray300' : 'black'} />
      </CountWrapper>
    </>
  )
}

export default ProductSummary

const ProductName = styled.p`
  margin-top: 14px;
  font-weight: 600;
  font-size: 32px;
  line-height: 140%;
  ${({ theme }) => theme.color.black}
`

const ProductPrice = styled.p`
  margin-top: 8px;

  font-size: 32px;
  line-height: 140%;

  color: ${({ theme }) => theme.color.black};
`

const CountWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  span {
    width: 60px;
    font-weight: 600;
    font-size: 48px;
    line-height: 57px;
    text-align: center;
  }
`
