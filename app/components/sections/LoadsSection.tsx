'use client'

import { ArrowRight, Package, MapPin } from 'lucide-react'
import { useLocale } from '@/lib/LocaleContext'

export function LoadsSection() {
  const { locale, t } = useLocale()
  const loads = t.loads.list

  return (
    <section id="network" className="py-24 lg:py-32 bg-[#050505] text-white" aria-labelledby="loads-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-burgundy/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-brand-burgundy mb-6">
            <Package className="w-4 h-4" aria-hidden="true" />
            {locale === 'es' ? 'Cargas disponibles' : 'Available loads'}
          </div>
          <h2 id="loads-heading" className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            {locale === 'es' ? 'Red de cargas listas para moverse' : 'Network of loads ready to move'}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            {locale === 'es'
              ? 'Consulta las rutas abiertas y contacta para asegurar espacio con despacho prioritario.'
              : 'Browse open lanes and contact us to secure space with priority dispatch.'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {loads.map((load, index) => (
            <article key={index} className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition-transform duration-300 hover:-translate-y-1 hover:border-brand-burgundy/40">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-brand-burgundy font-bold">{locale === 'es' ? 'Ruta' : 'Lane'}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{locale === 'es' ? load.route_es : load.route_en}</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-burgundy/10 text-brand-burgundy">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>
              <p className="text-white/60 mb-8 text-sm leading-relaxed">{locale === 'es' ? load.details_es : load.details_en}</p>
              <div className="flex items-center justify-between gap-4 text-brand-burgundy font-bold text-sm uppercase tracking-wide">
                <span>{locale === 'es' ? 'Contacta ya' : 'Contact now'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
