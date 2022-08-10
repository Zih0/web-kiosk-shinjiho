import { FC, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Image } from 'src/components/common/Image/Image'
import OptionSelectModal from 'src/components/common/Modal/OptionSelectModal/OptionSelectModal'
import { InternationalizationContext } from 'src/contexts/InternationalizationContext'
import useModal from 'src/hooks/useModal'
import { ProductOptionType } from 'src/types/api/product'

interface Props {
  id: number
  imgUrl: string
  krName: string
  enName: string
  price: number
  options: ProductOptionType[]
}

const Menu: FC<Props> = ({ id, imgUrl, krName, enName, price, options }) => {
  const { language } = useContext(InternationalizationContext)
  const { open, onOpen, onClose } = useModal()

  return (
    <>
      <Wrapper onClick={onOpen}>
        <Image width={216} height={216} src={imgUrl} />
        <MenuName>
          {language === 'KR' && krName}
          {language === 'EN' && enName}
        </MenuName>
        <MenuPrice>{price}</MenuPrice>
      </Wrapper>
      <OptionSelectModal
        open={open}
        onClose={onClose}
        id={id}
        imgUrl={imgUrl}
        krName={krName}
        enName={enName}
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
