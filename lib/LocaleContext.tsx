'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Locale } from './i18n'
import { translations } from './i18n'

type LocaleContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof translations)['es']
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = (localStorage.getItem('locale') as Locale) || 'es'
    if (saved !== locale) {
      setLocaleState(saved)
    }
    document.documentElement.lang = saved
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    document.documentElement.lang = newLocale
  }

  const contextValue = {
    locale,
    setLocale,
    t: translations[locale],
  }

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return context
}
