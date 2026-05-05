'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { LocaleProvider } from '@/lib/LocaleContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Chatbot } from './Chatbot';
import { Navbar } from './layout/Navbar';

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}

export function ClientWrapper() {
  return (
    <LocaleProvider>
      <ClientOnly>
        <Navbar />
        <LanguageSwitcher />
        <Chatbot />
      </ClientOnly>
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
  );
}