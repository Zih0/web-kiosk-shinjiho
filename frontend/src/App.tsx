import { useLayoutEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import InternationalizationProvider from 'src/contexts/InternationalizationContext'
import GlobalStyle from 'src/styles/GlobalStyles'
import { theme } from 'src/styles/theme'

import Router from './Router'
import { initAxiosConfig } from './api'
import ServerStateProvider from './contexts/ServerStateCacheContext'

function App() {
  useLayoutEffect(() => {
    initAxiosConfig()
  }, [])

  return (
    <ServerStateProvider>
      <InternationalizationProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </InternationalizationProvider>
    </ServerStateProvider>
  )
}

export default App
