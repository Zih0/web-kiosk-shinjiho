import { useLayoutEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import InternationalizationProvider from 'src/contexts/InternationalizationContext'
import GlobalStyle from 'src/styles/GlobalStyles'
import { theme } from 'src/styles/theme'

import Router from './Router'
import { initAxiosConfig } from './api'
import Toast from './components/common/Modal/Toast/Toast'
import ServerStateProvider from './contexts/ServerStateCacheContext'
import ToastProvider from './contexts/ToastContext'

function App() {
  useLayoutEffect(() => {
    initAxiosConfig()
  }, [])

  return (
    <ServerStateProvider>
      <InternationalizationProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ToastProvider>
            <Router />
            <Toast />
          </ToastProvider>
        </ThemeProvider>
      </InternationalizationProvider>
    </ServerStateProvider>
  )
}

export default App
