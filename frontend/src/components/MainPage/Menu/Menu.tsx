import { FC } from 'react'
import { Image } from 'src/components/common/Image/Image'
import styled from 'styled-components'

interface Props {
  id: number
  imgUrl: string
  name: string
  price: number
  option: Record<string, any[]>
}

const Menu: FC<Props> = ({ imgUrl, name, price }) => {
  return (
    <Wrapper>
      <Image width={216} height={216} src={imgUrl} />
      <MenuName>{name}</MenuName>
      <MenuPrice>{price}</MenuPrice>
    </Wrapper>
  )
}

export default Menu

const Wrapper = styled.div`
  position: relative;
  padding: 45px 44px;

  width: 312px;
  height: 432px;

  display: flex;
  flex-direction: column;

  align-items: center;

  background: ${({ theme }) => theme.color.gray100};
  border-radius: 24px;
`

const MenuName = styled.p`
  position: absolute;
  bottom: 98px;

  font-weight: 600;
  font-size: 32px;
  line-height: 140%;
  text-align: center;
`

const MenuPrice = styled.p`
  position: absolute;
  bottom: 44px;

  font-weight: 400;
  font-size: 32px;
  line-height: 140%;
`
