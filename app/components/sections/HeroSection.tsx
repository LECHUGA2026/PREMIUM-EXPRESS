'use client'

import { ArrowRight, Globe2, ShieldCheck, Sparkles } from 'lucide-react'
import { useLocale } from '@/lib/LocaleContext'

export function HeroSection() {
  const { locale } = useLocale()
  const heroAccent = locale === 'es' ? 'capacidad garantizada.' : 'guaranteed capacity.'

  return (
    <section id="inicio" className="relative overflow-hidden bg-[#030303] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(76,7,15,0.25),transparent_40%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-10">
            <p className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.45em] text-white/40">
              
            </p>

            <div className="space-y-6">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.92]">
                {locale === 'es' ? 'Tu carga en manos de' : 'Your freight in the hands of'}
                <span className="block text-brand-burgundy mt-2">
                  {locale === 'es' ? 'los mejores brokers' : 'trusted brokers'}
                </span>
              </h1>

              <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/80">
                <span className="mr-2">{locale === 'es' ? 'Con' : 'With'}</span>
                <span className="text-white">{heroAccent}</span>
              </div>

              <p className="max-w-2xl text-white/60 text-lg leading-relaxed">
                {locale === 'es'
                  ? 'Conecta a tu operación con capacidad real, despacho premium y seguimiento claro en toda la red de los 48 estados.'
                  : 'Connect your operation to real capacity, premium dispatch and clear tracking across the 48 state network.'}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-burgundy px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-burgundy-dark shadow-[0_24px_80px_rgba(122,13,24,0.25)]"
              >
                {locale === 'es' ? 'Comenzar ahora' : 'Get started'}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#por-que"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-8 py-4 text-sm font-semibold text-white/80 transition hover:text-white hover:border-brand-burgundy"
              >
                {locale === 'es' ? 'Ver por qué' : 'See why'}
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Globe2,
                  title: locale === 'es' ? 'Cobertura' : 'Coverage',
                  subtitle: locale === 'es' ? '48 estados contiguos' : '48 contiguous states',
                },
                {
                  icon: ShieldCheck,
                  title: locale === 'es' ? 'Seguridad' : 'Security',
                  subtitle: locale === 'es' ? 'Despacho verificado' : 'Verified dispatch',
                },
                {
                  icon: Sparkles,
                  title: locale === 'es' ? 'Atención' : 'Service',
                  subtitle: locale === 'es' ? 'Soporte 24/7' : '24/7 support',
                },
              ].map((card) => (
                <div key={card.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-burgundy/10 text-brand-burgundy">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.35em] text-white/40 mb-2">{card.title}</p>
                  <p className="text-base text-white/80">{card.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-[0_60px_120px_rgba(0,0,0,0.32)] backdrop-blur-xl">
              <div className="text-sm uppercase tracking-[0.45em] text-white/40 mb-6">
                {locale === 'es' ? 'Operaciones clave' : 'Key operations'}
              </div>
              <div className="space-y-6">
                {[
                  {
                    title: locale === 'es' ? 'Líneas exprés' : 'Express lanes',
                    description:
                      locale === 'es'
                        ? 'Carga prioritaria con aliados premium a lo largo de la costa oeste, centro y este.'
                        : 'Priority freight with premium partners across west, central and east corridors.',
                  },
                  {
                    title: locale === 'es' ? 'Visibilidad total' : 'Total visibility',
                    description:
                      locale === 'es'
                        ? 'Seguimiento claro y atención inmediata en cada etapa del envío.'
                        : 'Clear tracking and immediate support at every shipment stage.',
                  },
                  {
                    title: locale === 'es' ? 'Broker experto' : 'Expert broker',
                    description:
                      locale === 'es'
                        ? 'Un equipo especializado en demanda, rutas y cumplimiento normativo.'
                        : 'A team specialized in demand, routing, and compliance.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
