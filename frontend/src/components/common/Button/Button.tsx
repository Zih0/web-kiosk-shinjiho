import { FC } from 'react'
import styled, { css } from 'styled-components'

import { ColorTheme, ColorToken } from 'src/styles/type'

interface Props {
  width?: 'medium' | 'large' | 'full' | string
  bgColor?: ColorToken
  disabled?: boolean
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const WIDTH = {
  medium: '240px',
  large: '300px',
  full: '100%',
}

const getWidth = (width?: 'medium' | 'large' | 'full' | string) => {
  switch (width) {
    case 'medium':
    case 'large':
    case 'full':
      return WIDTH[width]
    default:
      return width
  }
}

const Button: FC<Props> = ({ width, bgColor, disabled, isLoading, className, children, onClick }) => {
  const buttonWidth = getWidth(width)

  return (
    <StyledButton
      width={buttonWidth}
      bgColor={bgColor}
      isLoading={isLoading}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

export default Button

const getFontColor = (theme: ColorTheme, bgColor: ColorToken) => {
  return ['gray100'].includes(bgColor) ? theme.color.black : theme.color.white
}

const StyledButton = styled.button<Pick<Props, 'bgColor' | 'width' | 'isLoading'>>`
  position: relative;
  overflow: hidden;

  padding: 31px 62px;
  min-width: 240px;
  height: 100px;

  ${({ width }) => (width ? ` width: ${width};` : '')}

  font-size: 32px;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: filter 0.2s;

  background-color: ${({ theme, bgColor }) => (bgColor ? theme.color[bgColor] : theme.color.gray800)};
  color: ${({ theme, bgColor }) => (bgColor ? getFontColor(theme, bgColor) : theme.color.white)};

  border-radius: 20px;

  ${({ isLoading }) =>
    isLoading &&
    css`
      background-color: ${({ theme }) => theme.color.gray100};

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100%;
        background: ${({ theme }) =>
          `linear-gradient(to right, ${theme.color.gray100}, ${theme.color.gray200},${theme.color.gray100})`};
        animation: ${({ theme }) => theme.animation.skeletonLoading} 1.5s infinite linear;
      }
    `}

  &:active {
    filter: brightness(80%);
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ bgColor, theme }) => (bgColor === 'red' ? theme.color.red100 : theme.color.gray500)};
  }
`
