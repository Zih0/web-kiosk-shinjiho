import styled from 'styled-components'

import { useCartAction } from 'src/contexts/CartContext'
import useTimer from 'src/hooks/useTimer'
import { useRouter } from 'src/lib/router/Routes'

const TIME_SHOW_TRIGGER = 10

const Time = () => {
  const router = useRouter()
  const { clear } = useCartAction()

  const reset = () => {
    router('/')
    clear()
  }

  const { time } = useTimer(reset)

  return <TimeText>{time <= TIME_SHOW_TRIGGER && `${time}초 동안 아무런 반응이 없으면 자동으로 종료됩니다.`}</TimeText>
}

const TimeText = styled.p`
  margin-bottom: 12px;
  height: 24px;

  font-size: 24px;

  text-align: end;

  color: ${({ theme }) => theme.color.gray200};
`

export default Time
