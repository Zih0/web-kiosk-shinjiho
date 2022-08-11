import styled from 'styled-components'

import { useCartAction } from 'src/contexts/CartContext'
import useTimer from 'src/hooks/useTimer'
import useTranslation from 'src/hooks/useTranslation'
import { useRouter } from 'src/lib/router/Routes'

const TIME_SHOW_TRIGGER = 10

const Time = () => {
  const t = useTranslation('main')
  const router = useRouter()
  const { clear } = useCartAction()

  const reset = () => {
    router('/')
    clear()
  }

  const { time } = useTimer(reset)

  return <TimeText>{time <= TIME_SHOW_TRIGGER && `${t('disappearText1')} ${time} ${t('disappearText2')}`}</TimeText>
}

const TimeText = styled.p`
  margin-bottom: 12px;
  height: 24px;

  font-size: 30px;

  text-align: end;

  color: ${({ theme }) => theme.color.gray200};
`

export default Time
