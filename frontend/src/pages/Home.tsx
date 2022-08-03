import styled from 'styled-components'
import useTranslation from 'src/hooks/useTranslation'
import Link from 'src/lib/router/Link'

const Home = () => {
  const t = useTranslation('home')

  return (
    <Wrapper>
      <Title>{t('title')}</Title>
      <Desc>{t('desc')}</Desc>
      <ButtonWrapper>
        <Button to="/main">
          <ButtonTitle>{t('eatIn')}</ButtonTitle>
          <ButtonDesc>{t('eatInCup')}</ButtonDesc>
        </Button>
        <Button to="/main">
          <ButtonTitle>{t('takeOut')}</ButtonTitle>
          <ButtonDesc>{t('takeOutCup')}</ButtonDesc>
        </Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default Home

const Wrapper = styled.div`
  margin-top: 417px;
  padding: 0 60px;
`

const Title = styled.h1`
  font-size: 72px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.black};
`

const Desc = styled.p`
  margin-top: 24px;
  font-size: 36px;
  color: ${({ theme }) => theme.color.black};
`

const ButtonWrapper = styled.div`
  margin-top: 157px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
`

const Button = styled(Link)`
  width: 465px;
  height: 490px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.color.gray100};
  border-radius: 24px;

  color: ${({ theme }) => theme.color.black};
`

const ButtonTitle = styled.p`
  font-weight: 600;
  font-size: 64px;
  line-height: 140%;
`

const ButtonDesc = styled.p`
  margin-top: 24px;
  font-size: 36px;
  line-height: 140%;
`
