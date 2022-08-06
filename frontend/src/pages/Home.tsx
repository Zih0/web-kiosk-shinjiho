import styled from 'styled-components'
import useTranslation from 'src/hooks/useTranslation'
import Link from 'src/lib/router/Link'
import LanguageButton from 'src/components/common/LanguageButton/LanguageButton'
import Slider from 'src/components/common/Slider/Slider'

const Home = () => {
  const t = useTranslation('home')

  return (
    <>
      <Slider
        imgList={[
          'https://www.ediya.com/files/banner/IMG_1655429441772.jpg',
          'https://www.ediya.com/files/banner/IMG_1650949894894.jpg',
          'https://www.ediya.com/files/banner/IMG_1649291403353.jpg',
        ]}
      />
      <Wrapper>
        <LanguageWrapper>
          <LanguageButton />
        </LanguageWrapper>

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
    </>
  )
}

export default Home

const Wrapper = styled.div`
  padding: 0 60px;
`

const LanguageWrapper = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: flex-end;
`

const Title = styled.h1`
  margin-top: 100px;
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
