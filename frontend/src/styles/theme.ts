import { colors } from 'src/styles/colors'
import { AnimationTheme, ColorTheme } from 'src/styles/type'

import { animations } from './animations'

export const theme: ColorTheme & AnimationTheme = {
  color: colors,
  animation: animations,
}

export type StyledTheme = typeof theme
