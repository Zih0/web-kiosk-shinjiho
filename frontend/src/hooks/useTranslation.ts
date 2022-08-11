import { useLayoutEffect, useState } from 'react'

import { useLanguage } from 'src/contexts/InternationalizationContext'

type TextObjType = Record<string, string>

const useTranslation = (fileName: string) => {
  const language = useLanguage()
  const [textObject, setTextObject] = useState<TextObjType>({})

  const getJsonData = async () => {
    const jsonData = await import(`src/i18n/${language}/${fileName}.json`)
    setTextObject(jsonData)
  }

  useLayoutEffect(() => {
    getJsonData()
  }, [language])

  const t = (key: string) => {
    return textObject[key]
  }

  return t
}

export default useTranslation
