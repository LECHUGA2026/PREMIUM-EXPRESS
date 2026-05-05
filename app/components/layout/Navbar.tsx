'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/LocaleContext'

export function Navbar() {
  const { locale } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navLinks = [
    { label: locale === 'es' ? 'Inicio' : 'Home', href: '#inicio' },
    { label: locale === 'es' ? 'Por qué' : 'Why', href: '#por-que' },
    { label: locale === 'es' ? 'Red' : 'Network', href: '#network' },
    { label: locale === 'es' ? 'Contacto' : 'Contact', href: '#contacto' },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setIsOpen(false)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#020202]/92 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/20'
          : 'bg-transparent',
      )}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between" aria-label="Main navigation">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Premium Express">
          <div className="w-10 h-10 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center">
            <span className="text-brand-burgundy font-display font-black text-lg uppercase">P</span>
          </div>
          <div className="leading-tight">
            <p className="text-white font-semibold uppercase tracking-[0.2em] text-sm">Premium</p>
            <p className="text-brand-burgundy text-xs uppercase tracking-[0.4em]">Express</p>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/75 hover:text-white text-sm font-semibold tracking-[0.18em] uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="#contacto" className="inline-flex items-center justify-center rounded-full bg-brand-burgundy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-burgundy-dark">
            {locale === 'es' ? 'Contacto' : 'Contact'}
          </a>
        </div>

        <button
          className="lg:hidden p-2 text-white/80 hover:text-brand-burgundy"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
        aria-hidden={!isOpen}
      >
        <div className="px-6 pb-6 pt-2 space-y-3 bg-[#040404] border-t border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="block rounded-2xl px-4 py-3 text-white/80 hover:text-brand-burgundy hover:bg-white/5 transition"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={handleLinkClick}
            className="block rounded-2xl bg-brand-burgundy px-4 py-3 text-center text-white font-semibold uppercase tracking-[0.15em]"
          >
            {locale === 'es' ? 'Contacto' : 'Contact'}
          </a>
        </div>
      </div>
    </header>
  )
}
