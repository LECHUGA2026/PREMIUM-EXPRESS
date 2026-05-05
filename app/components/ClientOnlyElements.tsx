'use client'

import { useEffect, useState } from 'react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Chatbot } from './Chatbot'
import { Navbar } from './layout/Navbar'

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted ? <>{children}</> : null
}

export function ClientOnlyElements() {
  return (
    <ClientOnly>
      <Navbar />
      <LanguageSwitcher />
      <Chatbot />
    </ClientOnly>
  )
}
