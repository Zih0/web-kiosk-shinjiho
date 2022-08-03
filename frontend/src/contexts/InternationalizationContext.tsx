import { createContext, FC, useState } from 'react'
import { InternationalizationType } from 'src/i18n'

interface Internationalization {
  language: InternationalizationType
  changeLanguage: (newLanguage: InternationalizationType) => void
}

export const InternationalizationContext = createContext<Internationalization>({
  language: 'KR',
  changeLanguage: () => {},
})

interface Props {
  children: React.ReactNode
}

const InternationalizationProvider: FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState<InternationalizationType>('KR')

  const changeLanguage = (newLanguage: InternationalizationType) => {
    setLanguage(newLanguage)
  }

  return (
    <InternationalizationContext.Provider
      value={{
        language,
        changeLanguage,
      }}
    >
      {children}
    </InternationalizationContext.Provider>
  )
}

export default InternationalizationProvider
