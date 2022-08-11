import { FC, useState } from 'react'
import styled from 'styled-components'

import { getCategoriesAPI } from 'src/api/category/category'
import { useLanguage } from 'src/contexts/InternationalizationContext'
import { useAxios } from 'src/hooks/useAxios'

import CategoryTabsSkeleton from './CategoryTabsSkeleton'

import Button from '../common/Button/Button'

interface Props {
  selected: number
  onClickCategory: (id: number) => void
}

const OFFSET = 6

const CategoryTabs: FC<Props> = ({ selected, onClickCategory }) => {
  const language = useLanguage()
  const { isLoading, data: categories } = useAxios(['categories'], getCategoriesAPI)
  const [cursor, setCursor] = useState(0)
  const slideCount = Math.ceil((categories?.length ?? 0) / OFFSET) || 1

  if (isLoading) return <CategoryTabsSkeleton />

  return (
    <SliderWrapper>
      <Slider count={slideCount}>
        {new Array(slideCount).fill(0).map((_, idx) => {
          return (
            <Wrapper key={idx}>
              {categories?.slice(idx * OFFSET, (idx + 1) * OFFSET).map((category) => (
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
        })}
      </Slider>
    </SliderWrapper>
  )
}

export default CategoryTabs

const SliderWrapper = styled.div`
  width: 100%;
  overflow: auto;
`

const Slider = styled.div<{ count: number }>`
  display: flex;
  gap: 30px;
  width: ${({ count }) => `${count * 100}%`};
`

const Wrapper = styled.div`
  margin-top: 30px;
  min-width: 996px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`
