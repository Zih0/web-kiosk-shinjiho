import { FC, useContext, useEffect, useState } from 'react'
import { getCategoriesAPI } from 'src/api/category/category'
import { InternationalizationContext } from 'src/contexts/InternationalizationContext'
import { CategoryType } from 'src/types/api/category'
import styled from 'styled-components'
import Button from '../../common/Button/Button'

interface Props {
  selected: number
  onClickCategory: (id: number) => void
}

const CategoryTabs: FC<Props> = ({ selected, onClickCategory }) => {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const { language } = useContext(InternationalizationContext)

  const getCategories = async () => {
    const data = await getCategoriesAPI()
    setCategories(data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Wrapper>
      {categories.map((category) => (
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
