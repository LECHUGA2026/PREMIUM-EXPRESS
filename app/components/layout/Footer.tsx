'use client'

import { Phone, Mail, MapPin } from 'lucide-react'
import { useLocale } from '@/lib/LocaleContext'

export function Footer() {
  const { t, locale } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#020202] border-t border-white/10 text-white/80" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">Premium Express</p>
            <h2 className="text-3xl font-semibold text-white">{locale === 'es' ? 'Broker de carga con mirada premium' : 'Premium freight brokerage'}</h2>
            <p className="max-w-md text-white/60 leading-relaxed">
              {locale === 'es'
                ? 'Soluciones de corretaje diseñadas para mover tus cargas con velocidad, transparencia y seguridad en todo Estados Unidos.'
                : 'Brokerage solutions designed to move your freight with speed, transparency, and security across the United States.'}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">{locale === 'es' ? 'Enlaces rápidos' : 'Quick links'}</p>
            <ul className="space-y-3">
              {[
                { label: locale === 'es' ? 'Inicio' : 'Home', href: '#inicio' },
                { label: locale === 'es' ? 'Por qué' : 'Why', href: '#por-que' },
                { label: locale === 'es' ? 'Red' : 'Network', href: '#network' },
                { label: locale === 'es' ? 'Contacto' : 'Contact', href: '#contacto' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/50 hover:text-white transition-colors text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">{locale === 'es' ? 'Contacto' : 'Contact'}</p>
            <a href="tel:+19153168488" className="block text-sm text-white/80 hover:text-white">
              +1 (915) 316-8488
            </a>
            <a href="mailto:info@premiumexpress.com" className="block text-sm text-white/80 hover:text-white">
              info@premiumexpress.com
            </a>
            <p className="text-sm text-white/50">{locale === 'es' ? '48 estados contiguos, EE.UU.' : '48 contiguous states, USA'}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-white/30">
          <span>© {year} Premium Express. {t.footer.rights}.</span>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-white/60 transition-colors">
              {locale === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              {locale === 'es' ? 'Términos de Servicio' : 'Terms of Service'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
