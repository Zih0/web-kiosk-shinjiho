import React, { FC, useContext, useEffect, useState } from 'react'
import { InternationalizationContext } from 'src/contexts/InternationalizationContext'
import useTranslation from 'src/hooks/useTranslation'
import { ProductOptionDetailType, ProductOptionType } from 'src/types/api/product'
import { priceToString } from 'src/utils/priceUtil'
import styled from 'styled-components'
import Icon from '../Icon/Icon'
import { Image } from '../Image/Image'
import Modal from './Modal'

interface Props {
  open: boolean
  onClose: () => void
  id: number
  imgUrl: string
  name: string
  price: number
  options: ProductOptionType[]
}

const MIN_COUNT = 1
const MAX_COUNT = 9

const OptionSelectModal: FC<Props> = ({ open, onClose, id, imgUrl, name, price, options }) => {
  const { language } = useContext(InternationalizationContext)
  const t = useTranslation('modal')
  const [count, setCount] = useState(MIN_COUNT)
  const [extraPrice, setExtraPrice] = useState(0)
  const [selectedOption, setSelectedOption] = useState<any>({})

  const onClickMinus = () => {
    if (count === MIN_COUNT) return

    setCount((prev) => prev - 1)
  }

  const onClickPlus = () => {
    if (count === MAX_COUNT) return

    setCount((prev) => prev + 1)
  }

  const onChangeOptionDetail = (optionId: number, detail: ProductOptionDetailType) => {
    setSelectedOption((prev: any) => ({
      ...prev,
      [optionId]: detail.id,
    }))

    if (!detail.price) return

    plusExtraPrice(detail.price)
  }

  const closeCallback = () => {
    onClose && onClose()
    setSelectedOption({})
  }

  const plusExtraPrice = (price: number) => {
    setExtraPrice(price)
  }

  return (
    <Modal
      open={open}
      onClose={closeCallback}
      title={t('optionTitle')}
      closeText={t('optionCancelText')}
      submitText={t('optionSubmitText')}
      hasCloseButton
      hasSubmitButton
    >
      <Wrapper>
        <LeftSection>
          <Image src={imgUrl} width={224} height={224} />
          <ProductName>{name}</ProductName>
          <ProductPrice>{priceToString((price + extraPrice) * count)}</ProductPrice>
          <CountWrapper>
            <Icon
              name="iconCircleMinus"
              size={36}
              onClick={onClickMinus}
              strokeColor={count === MIN_COUNT ? 'gray300' : 'black'}
            />
            <span>{count}</span>
            <Icon
              name="iconCirclePlus"
              size={36}
              onClick={onClickPlus}
              strokeColor={count === MAX_COUNT ? 'gray300' : 'black'}
            />
          </CountWrapper>
        </LeftSection>
        <RightSection>
          {options.map((option) => (
            <div key={option.id}>
              <OptionTitle>
                {language === 'KR' && option.kr_name}
                {language === 'EN' && option.en_name}
              </OptionTitle>
              <OptionDetailList>
                {option.option_details.map((detail) => (
                  <React.Fragment key={detail.id}>
                    <input
                      type="radio"
                      id={`radio-${detail.id}`}
                      value={detail.id}
                      checked={selectedOption[option.id] === detail.id}
                      onChange={() => onChangeOptionDetail(option.id, detail)}
                      hidden
                    />
                    <OptionDetailLabel htmlFor={`radio-${detail.id}`} key={detail.id}>
                      {language === 'KR' && detail.kr_name}
                      {language === 'EN' && detail.en_name}
                    </OptionDetailLabel>
                  </React.Fragment>
                ))}
              </OptionDetailList>
            </div>
          ))}
        </RightSection>
      </Wrapper>
    </Modal>
  )
}

export default OptionSelectModal

const Wrapper = styled.div`
  margin-top: 60px;
  display: flex;

  gap: 38px;
`

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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
  ${({ theme }) => theme.color.black}
`

const CountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  span {
    width: 30px;
    font-weight: 600;
    font-size: 48px;
    line-height: 57px;
    text-align: center;
  }
`

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const OptionTitle = styled.p`
  font-weight: 600;
  font-size: 32px;
  line-height: 140%;
`

const OptionDetailList = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 32px;
`

const OptionDetailLabel = styled.label`
  padding-bottom: 14px;
  width: 80px;
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 24px;

  font-size: 20px;
  line-height: 140%;

  input[type='radio']:checked + & {
    border: 2px solid ${({ theme }) => theme.color.red};
    color: ${({ theme }) => theme.color.red};
  }
`
