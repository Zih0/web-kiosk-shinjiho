import { animations } from './animations'
import { colors } from './colors'

export type ColorToken = keyof typeof colors
export type ColorScheme = Record<ColorToken, string>

export type AnimationScheme = typeof animations

export type ColorTheme = {
  color: ColorScheme
}

export type AnimationTheme = {
  animation: AnimationScheme
}
