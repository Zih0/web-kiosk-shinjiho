import Header from 'src/components/common/Header/Header'
import CategoryTabs from 'src/components/MainPage/CategoryTabs'
import styled from 'styled-components'

const Main = () => {
  return (
    <Wrapper>
      <Header />
      <CategoryTabs />
    </Wrapper>
  )
}

export default Main

const Wrapper = styled.div`
  padding: 0 42px;
`
