import 'styled-components'

import { StyledTheme } from 'src/styles/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends StyledTheme {}
}
