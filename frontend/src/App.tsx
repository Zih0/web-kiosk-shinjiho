import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'src/styles/GlobalStyles'
import { theme } from 'src/styles/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
