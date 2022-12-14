import { FC, useContext } from 'react'
import styled from 'styled-components'

import { InternationalizationContext } from 'src/contexts/InternationalizationContext'

interface Props {}

const LanguageButton: FC<Props> = () => {
  const { language, changeLanguage } = useContext(InternationalizationContext)

  const onClickLanguageButton = () => {
    if (language === 'KR') changeLanguage('EN')
    if (language === 'EN') changeLanguage('KR')
  }

  return (
    <Button onClick={onClickLanguageButton}>
      {language === 'KR' && 'π°π·'}
      {language === 'EN' && 'πΊπΈ'}
    </Button>
  )
}

export default LanguageButton

const Button = styled.button`
  width: 112px;
  height: 112px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 72px;

  background-color: ${({ theme }) => theme.color.gray100};

  border-radius: 50%;
`
