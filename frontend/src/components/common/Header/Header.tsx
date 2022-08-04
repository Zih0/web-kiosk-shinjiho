import useTranslation from 'src/hooks/useTranslation'
import Link from 'src/lib/router/Link'
import styled from 'styled-components'
import Icon from '../Icon/Icon'
import LanguageButton from '../LanguageButton/LanguageButton'

const Header = () => {
  const t = useTranslation('main')

  return (
    <Wrapper>
      <InitButton to="/">
        <Icon name="iconArrowLeft" size={42} />
        <span>{t('back')}</span>
      </InitButton>
      <Title>{t('title')}</Title>
      <LanguageButton />
    </Wrapper>
  )
}

export default Header

const Wrapper = styled.div`
  width: 100%;
  padding-top: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InitButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;

  span {
    font-weight: 600;
    font-size: 32px;
    line-height: 140%;
  }
`

const Title = styled.h1`
  font-weight: 700;
  font-size: 42px;
  line-height: 140%;
  vertical-align: center;
`
