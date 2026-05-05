'use client'

import { LocaleProvider } from '@/lib/LocaleContext'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0A1628',
            color: '#ffffff',
            border: '1px solid #1B3A6B',
          },
          classNames: {
            success: 'border-orange-500',
            error: 'border-red-500',
          },
        }}
      />
    </LocaleProvider>
  )
}
