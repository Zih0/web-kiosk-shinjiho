import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'src/styles/GlobalStyles'
import { theme } from 'src/styles/theme'
import Router from './Router'
import InternationalizationProvider from 'src/contexts/InternationalizationContext'

function App() {
  return (
    <InternationalizationProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </InternationalizationProvider>
  )
}

export default App
