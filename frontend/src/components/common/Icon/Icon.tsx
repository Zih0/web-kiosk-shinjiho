import React, { FC } from 'react'
import styled, { css } from 'styled-components'

import * as icons from 'src/components/common/Icon/iconPath'
import { ColorToken } from 'src/styles/type'

export interface Props {
  name: keyof typeof icons

  rotate?: 0 | 90 | 180 | 270
  size?: number
  fillColor?: ColorToken
  strokeColor?: ColorToken
  opacity?: string
  className?: string

  onClick?: () => void
}

const Icon: FC<Props> = ({ name, size, rotate, fillColor, strokeColor, opacity, className, onClick }) => {
  const SVGIcon = icons[name]

  return (
    <SVGWrap
      onClick={onClick}
      size={size}
      fillColor={fillColor}
      strokeColor={strokeColor}
      opacity={opacity}
      className={className}
      rotate={rotate}
    >
      <SVGIcon />
    </SVGWrap>
  )
}
export default Icon

const SVGWrap = styled.div<Pick<Props, 'size' | 'fillColor' | 'strokeColor' | 'opacity' | 'rotate'>>`
  width: ${({ size }) => `${size ? size : 'auto'}px`};
  height: ${({ size }) => `${size ? size : 'auto'}px`};
  display: inline-block;
  opacity: ${({ opacity }) => opacity || '1'};
  ${({ rotate }) =>
    rotate &&
    css`
      transform: rotate(${rotate}deg);
    `};
  & svg {
    width: auto;
    height: 100%;
    display: block;
  }
  & path,
  & circle,
  & g {
    fill: ${({ fillColor, theme }) => fillColor && `${theme.color[fillColor]}`};
    stroke: ${({ strokeColor, theme }) => strokeColor && `${theme.color[strokeColor]}`};
  }
`
