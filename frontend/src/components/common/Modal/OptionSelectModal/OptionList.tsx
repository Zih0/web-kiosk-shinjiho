import React, { FC } from 'react'
import styled from 'styled-components'

import { SelectedOptionType } from 'src/contexts/CartContext'
import { useLanguage } from 'src/contexts/InternationalizationContext'
import { ProductOptionDetailType, ProductOptionType } from 'src/types/api/product'

import OptionItem from './OptionItem'

interface Props {
  selectedOption: SelectedOptionType
  onClickOptionDetail: (id: number, detail: ProductOptionDetailType) => void
  options: ProductOptionType[]
}

const OptionList: FC<Props> = ({ options, selectedOption, onClickOptionDetail }) => {
  const language = useLanguage()

  return (
    <>
      {options.map((option) => (
        <div key={option.id}>
          <OptionTitle>
            {language === 'KR' && option.kr_name}
            {language === 'EN' && option.en_name}
            {option.is_required && '*'}
          </OptionTitle>
          <OptionDetailList>
            {option.option_details.map((detail) => (
              <OptionItem
                key={detail.id}
                option={option}
                detail={detail}
                selectedOption={selectedOption}
                onClickOptionDetail={onClickOptionDetail}
              />
            ))}
          </OptionDetailList>
        </div>
      ))}
    </>
  )
}

export default OptionList

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
