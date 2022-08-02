import React, { FC } from 'react'
import styled from 'styled-components'

import * as images from 'src/components/common/Image/imagePath'

interface Props {
  name?: keyof typeof images
  src?: string
  width?: number
  height?: number
  borderRadius?: number
  alt?: string
  onClick?: () => void
}

export const Image: FC<Props> = ({ name, src, width, height, borderRadius, alt, onClick }) => {
  const imgSrc = name ? images[name] : src

  return (
    <ImgWrapper onClick={onClick} width={width} height={height} borderRadius={borderRadius}>
      <ImageComponent src={imgSrc ?? ''} width={width} height={height} borderRadius={borderRadius} alt={alt ?? ''} />
    </ImgWrapper>
  )
}

const ImgWrapper = styled.div<Pick<Props, 'width' | 'height' | 'borderRadius'>>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
`

const ImageComponent = styled.img<Pick<Props, 'borderRadius'>>`
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
`
