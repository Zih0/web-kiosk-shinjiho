import { FC, useEffect, useState } from 'react'
import { Image } from 'src/components/common/Image/Image'
import OptionSelectModal from 'src/components/common/Modal/OptionSelectModal'
import { ProductOptionType } from 'src/types/api/product'
import styled from 'styled-components'

interface Props {
  id: number
  imgUrl: string
  name: string
  price: number
  options: ProductOptionType[]
}

const Menu: FC<Props> = ({ id, imgUrl, name, price, options }) => {
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
  }

  const onClickMenu = () => {
    setOpen(true)
  }

  return (
    <>
      <Wrapper onClick={onClickMenu}>
        <Image width={216} height={216} src={imgUrl} />
        <MenuName>{name}</MenuName>
        <MenuPrice>{price}</MenuPrice>
      </Wrapper>
      <OptionSelectModal
        open={open}
        onClose={onClose}
        id={id}
        imgUrl={imgUrl}
        name={name}
        price={price}
        options={options}
      />
    </>
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
