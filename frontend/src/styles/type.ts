import { colors } from './colors'

export type ColorToken = keyof typeof colors
export type ColorScheme = Record<ColorToken, string>

export type ColorTheme = {
  color: ColorScheme
}
