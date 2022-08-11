import React from 'react'
import styled from 'styled-components'

import Button from 'src/components/common/Button/Button'

const CategoryTabsSkeleton = () => {
  return (
    <Wrapper>
      <Button isLoading />
      <Button isLoading />
      <Button isLoading />
      <Button isLoading />
      <Button isLoading />
      <Button isLoading />
    </Wrapper>
  )
}

export default CategoryTabsSkeleton

const Wrapper = styled.div`
  margin-top: 30px;
  min-width: 996px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`
