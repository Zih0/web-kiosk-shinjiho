import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'src/styles/GlobalStyles'
import { theme } from 'src/styles/theme'
import Router from './Router'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <Router />
    </ThemeProvider>
  )
}

export default App
