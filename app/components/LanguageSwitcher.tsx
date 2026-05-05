'use client'

import { Globe } from 'lucide-react'
import { useLocale } from '@/lib/LocaleContext'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  const toggleLocale = () => {
    const newLocale = locale === 'es' ? 'en' : 'es'
    setLocale(newLocale)
  }

  return (
    <button
      onClick={toggleLocale}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#4c070f] hover:bg-[#7a0d18] text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 font-semibold"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm">{locale === 'es' ? 'EN' : 'ES'}</span>
    </button>
  )
}
