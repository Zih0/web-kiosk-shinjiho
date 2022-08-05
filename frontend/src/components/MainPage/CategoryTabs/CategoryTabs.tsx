import { FC, useContext, useState } from 'react'
import { InternationalizationContext } from 'src/contexts/InternationalizationContext'
import styled from 'styled-components'
import Button from '../../common/Button/Button'

const DUMMY_CATEGORY = [
  { id: 1, kr_name: '커피', en_name: 'Coffee' },
  { id: 2, kr_name: '디카페인', en_name: 'Non-Coffee' },
  { id: 3, kr_name: '티', en_name: 'Tea' },
  { id: 4, kr_name: '에이드', en_name: 'Ade' },
  { id: 5, kr_name: '주스', en_name: 'Juice' },
  { id: 6, kr_name: '디저트', en_name: 'Dessert' },
]

interface Props {
  selected: number
  onClickCategory: (id: number) => void
}

const CategoryTabs: FC<Props> = ({ selected, onClickCategory }) => {
  const { language } = useContext(InternationalizationContext)

  return (
    <Wrapper>
      {DUMMY_CATEGORY.map((category) => (
        <Button
          key={category.id}
          bgColor={selected === category.id ? 'black' : 'gray100'}
          onClick={() => onClickCategory(category.id)}
        >
          {language === 'KR' && category.kr_name}
          {language === 'EN' && category.en_name}
        </Button>
      ))}
    </Wrapper>
  )
}

export default CategoryTabs

const Wrapper = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`
