import { FC, useContext } from 'react'
import { getCategoriesAPI } from 'src/api/category/category'
import { InternationalizationContext } from 'src/contexts/InternationalizationContext'
import { useAxios } from 'src/hooks/useAxios'
import styled from 'styled-components'
import Button from '../../common/Button/Button'

interface Props {
  selected: number
  onClickCategory: (id: number) => void
}

const CategoryTabs: FC<Props> = ({ selected, onClickCategory }) => {
  const { language } = useContext(InternationalizationContext)
  const { isLoading, data: categories } = useAxios(['categories'], getCategoriesAPI)

  if (isLoading) return <></>

  return (
    <Wrapper>
      {categories?.map((category) => (
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
