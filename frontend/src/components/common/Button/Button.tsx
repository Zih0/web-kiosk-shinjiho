import { FC } from 'react'
import { ColorTheme, ColorToken } from 'src/styles/type'
import styled from 'styled-components'

interface Props {
  width?: 'medium' | 'large' | 'full' | string
  bgColor?: ColorToken
  disabled?: boolean
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

const Button: FC<Props> = ({ width, bgColor, disabled, className, children, onClick }) => {
  const buttonWidth = getWidth(width)

  return (
    <StyledButton width={buttonWidth} bgColor={bgColor} className={className} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default Button

const getFontColor = (theme: ColorTheme, bgColor: ColorToken) => {
  return ['gray100'].includes(bgColor) ? theme.color.black : theme.color.white
}

const StyledButton = styled.button<Pick<Props, 'bgColor' | 'width'>>`
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

  &:active {
    filter: brightness(80%);
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.gray500};
  }
`
