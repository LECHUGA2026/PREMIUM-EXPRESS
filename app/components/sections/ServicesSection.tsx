'use client'

import { Globe2, ShieldCheck, Sparkles } from 'lucide-react'
import { useLocale } from '@/lib/LocaleContext'

export function ServicesSection() {
  const { locale } = useLocale()

  return (
    <section id="por-que" className="py-24 lg:py-32 bg-[#070707] text-white" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-burgundy/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-brand-burgundy">
            {locale === 'es' ? 'Por qué Premium Express' : 'Why Premium Express'}
          </div>
          <h2 id="services-heading" className="mt-6 text-4xl font-display font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
            {locale === 'es'
              ? 'Gestion de cargas con presencia nacional y servicio premium'
              : 'Premium freight brokerage with national reach'}
          </h2>
          <p className="mt-6 text-white/60 text-lg leading-relaxed">
            {locale === 'es'
              ? 'Conectamos tu carga con rutas confiables, capacidad prioritaria y visibilidad real en todo Estados Unidos.'
              : 'We connect your freight with reliable lanes, priority capacity, and real visibility across the United States.'}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-20">
          {[
            {
              title: locale === 'es' ? 'Capacidad prioritaria' : 'Priority capacity',
              description:
                locale === 'es'
                  ? 'Espacio asegurado en flotas premium para tus cargas más exigentes.'
                  : 'Secured space on premium fleets for your most demanding shipments.',
              label: locale === 'es' ? 'Capacidad' : 'Capacity',
              icon: Globe2,
            },
            {
              title: locale === 'es' ? 'Despacho estratégico' : 'Strategic dispatch',
              description:
                locale === 'es'
                  ? 'Coordinamos rutas y tiempos para entregas oportunas y sin sorpresas.'
                  : 'We coordinate lanes and timing for on-time deliveries without surprises.',
              label: locale === 'es' ? 'Despacho' : 'Dispatch',
              icon: ShieldCheck,
            },
            {
              title: locale === 'es' ? 'Visibilidad completa' : 'Complete visibility',
              description:
                locale === 'es'
                  ? 'Información clara en cada etapa del transporte, del origen al destino.'
                  : 'Clear information at every stage of transport, from origin to destination.',
              label: locale === 'es' ? 'Visibilidad' : 'Visibility',
              icon: Sparkles,
            },
          ].map((service) => (
            <article key={service.title} className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)] transition-transform duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-burgundy/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-brand-burgundy">
                {service.label}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{service.title}</h3>
              <p className="mt-4 text-white/60 leading-relaxed">{service.description}</p>
              <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-burgundy/10 text-brand-burgundy">
                <service.icon className="h-6 w-6" />
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: locale === 'es' ? 'Estados conectados' : 'States connected', value: '48' },
            { label: locale === 'es' ? 'Apoyo 24/7' : '24/7 support', value: '24/7' },
            { label: locale === 'es' ? 'Años de experiencia' : 'Years of experience', value: '15+' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-4xl font-semibold text-white mb-3">{stat.value}</p>
              <p className="text-sm uppercase tracking-[0.35em] text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TruckReeferIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="30" width="70" height="40" rx="3" fill="currentColor" opacity="0.9" />
      <rect x="10" y="30" width="70" height="40" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="12" y="25" width="66" height="6" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="10" y="15" width="20" height="20" rx="2" fill="currentColor" opacity="0.8" />
      <circle cx="20" cy="75" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="60" cy="75" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="70" cy="75" r="5" fill="currentColor" opacity="0.9" />
      <line x1="30" y1="26" x2="30" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      <line x1="40" y1="26" x2="40" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      <line x1="50" y1="26" x2="50" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      <line x1="60" y1="26" x2="60" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      <rect x="13" y="18" width="8" height="8" rx="1" fill="rgba(255,255,255,0.3)" />
      <line x1="32" y1="30" x2="32" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

function TruckMapIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="35" width="60" height="30" rx="2" fill="currentColor" opacity="0.9" />
      <rect x="15" y="35" width="60" height="30" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="15" y="22" width="18" height="18" rx="2" fill="currentColor" opacity="0.8" />
      <circle cx="25" cy="70" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="55" cy="70" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="70" cy="70" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="50" cy="15" r="4" fill="currentColor" opacity="0.8" />
      <path d="M 50 20 L 45 30 L 55 30 Z" fill="currentColor" opacity="0.8" />
      <rect x="17" y="25" width="7" height="7" rx="1" fill="rgba(255,255,255,0.3)" />
      <circle cx="30" cy="50" r="1.5" fill="rgba(255,255,255,0.4)" />
      <circle cx="40" cy="50" r="1.5" fill="rgba(255,255,255,0.4)" />
      <circle cx="50" cy="50" r="1.5" fill="rgba(255,255,255,0.4)" />
      <circle cx="60" cy="50" r="1.5" fill="rgba(255,255,255,0.4)" />
    </svg>
  )
}
