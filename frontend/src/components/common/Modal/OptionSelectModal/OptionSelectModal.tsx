import { FC, useState } from 'react'
import styled from 'styled-components'

import { SelectedOptionType, useCartAction } from 'src/contexts/CartContext'
import { useToast } from 'src/contexts/ToastContext'
import useCount from 'src/hooks/useCount'
import useTranslation from 'src/hooks/useTranslation'
import { ProductOptionDetailType, ProductOptionType } from 'src/types/api/product'

import OptionList from './OptionList'
import ProductSummary from './ProductSummary'

import Modal from '../Modal'

type ExtraPriceType = Record<string, number>

interface Props {
  open: boolean
  onClose: () => void
  id: number
  imgUrl: string
  krName: string
  enName: string
  price: number
  options: ProductOptionType[]
}

const OptionSelectModal: FC<Props> = ({ open, onClose, id, imgUrl, krName, enName, price, options }) => {
  const { add } = useCartAction()
  const t = useTranslation('modal')
  const toast = useToast()
  const { count, increaseCount, decreaseCount, initCount, isMaxCount, isMinCount } = useCount()
  const [extraPrice, setExtraPrice] = useState<ExtraPriceType>({})
  const [selectedOption, setSelectedOption] = useState<SelectedOptionType>({})

  const extraPriceSum = Object.values(extraPrice).reduce((acc, cur) => acc + cur, 0)

  const requireOptionIdList: number[] = options.reduce((requiredIdList: number[], option) => {
    if (option.is_required) {
      requiredIdList.push(option.id)
    }
    return requiredIdList
  }, [])

  const checkRequiredOptions = () => {
    const notSelectedRequiredOptions = requireOptionIdList.filter(
      (requiredId) =>
        !Object.keys(selectedOption)
          .map((o) => +o)
          .includes(requiredId),
    )

    if (notSelectedRequiredOptions.length) return false
    return true
  }

  const onClickMinus = () => {
    decreaseCount()
  }

  const onClickPlus = () => {
    increaseCount()
  }

  const onCloseModal = () => {
    onClose && onClose()
    setSelectedOption({})
    initCount()
  }

  const onSubmit = () => {
    if (!checkRequiredOptions()) {
      toast.error(t('requiredOptionErrorToast'), { timeout: 3000 })
      return
    }

    add({
      count,
      id,
      price: price + extraPriceSum,
      kr_name: krName,
      en_name: enName,
      thumbnail: imgUrl,
      selectedOptions: selectedOption,
    })

    setExtraPrice({})

    onCloseModal()
  }

  const onClickOptionDetail = (optionId: number, detail: ProductOptionDetailType) => {
    if (selectedOption[optionId]?.detailId === detail.id) {
      setSelectedOption(({ [optionId]: value, ...prev }) => prev)

      if (detail.price) {
        setExtraPrice((prev) => ({
          ...prev,
          [optionId]: 0,
        }))
      }

      return
    }

    setSelectedOption((prev) => ({
      ...prev,
      [optionId]: {
        detailId: detail.id,
        detailKrName: detail.kr_name,
        detailEnName: detail.en_name,
      },
    }))

    setExtraPrice((prev) => ({
      ...prev,
      [optionId]: detail.price || 0,
    }))
  }

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      onSubmit={onSubmit}
      title={t('optionTitle')}
      closeText={t('optionCancelText')}
      submitText={t('optionSubmitText')}
      hasCloseButton
      hasSubmitButton
    >
      <Wrapper>
        <LeftSection>
          <ProductSummary
            imgUrl={imgUrl}
            krName={krName}
            enName={enName}
            price={price}
            extraPrice={extraPriceSum}
            count={count}
            isMinCount={isMinCount}
            isMaxCount={isMaxCount}
            onClickMinus={onClickMinus}
            onClickPlus={onClickPlus}
          />
        </LeftSection>
        <RightSection>
          <OptionList options={options} selectedOption={selectedOption} onClickOptionDetail={onClickOptionDetail} />
        </RightSection>
      </Wrapper>
    </Modal>
  )
}

export default OptionSelectModal

const Wrapper = styled.div`
  margin-top: 60px;
  display: flex;

  gap: 60px;
`

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
