import React, { FC, useContext } from 'react'
import styled from 'styled-components'

import { SelectedOptionType } from 'src/contexts/CartContext'
import { InternationalizationContext } from 'src/contexts/InternationalizationContext'
import { ProductOptionDetailType, ProductOptionType } from 'src/types/api/product'

interface Props {
  option: ProductOptionType
  detail: ProductOptionDetailType
  selectedOption: SelectedOptionType
  onClickOptionDetail: (id: number, detail: ProductOptionDetailType) => void
}

const OptionItem: FC<Props> = ({ option, detail, selectedOption, onClickOptionDetail }) => {
  const { language } = useContext(InternationalizationContext)

  return (
    <React.Fragment>
      <input
        type="radio"
        id={`radio-${detail.id}`}
        value={detail.id}
        required={option.is_required}
        checked={selectedOption[option.id]?.detailId === detail.id}
        readOnly
        hidden
      />
      <OptionDetailLabel
        htmlFor={`radio-${detail.id}`}
        key={detail.id}
        onClick={() => onClickOptionDetail(option.id, detail)}
      >
        {language === 'KR' && detail.kr_name}
        {language === 'EN' && detail.en_name}
        {detail.price > 0 && <ExtraPrice>+{detail.price}</ExtraPrice>}
      </OptionDetailLabel>
    </React.Fragment>
  )
}

export default OptionItem

const OptionDetailLabel = styled.label`
  width: 80px;
  height: 80px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 24px;

  font-size: 24px;
  line-height: 140%;

  input[type='radio']:checked + & {
    border: 2px solid ${({ theme }) => theme.color.red};
    color: ${({ theme }) => theme.color.red};
  }
`

const ExtraPrice = styled.p`
  font-size: 20px;
`
