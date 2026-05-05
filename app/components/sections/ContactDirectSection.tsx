'use client'

import { Phone, Briefcase, Truck, ArrowRight, Clock } from 'lucide-react'
import { useLocale } from '@/lib/LocaleContext'

const contacts = [
  {
    id: 'sales',
    icon: Briefcase,
    category_es: 'Ventas',
    category_en: 'Sales',
    title_es: 'Ventas',
    title_en: 'Sales',
    description_es:
      '¿Necesitas transportar mercancía? Habla directamente con nuestro equipo de ventas. Te ayudamos a encontrar la solución ideal para tu carga.',
    description_en:
      'Need to transport merchandise? Talk directly with our sales team. We help you find the ideal solution for your cargo.',
    phone: '+19153168488',
    phoneDisplay: '+1 (915) 316-8488',
    hours_es: 'Lun–Vie 7AM–7PM CST',
    hours_en: 'Mon–Fri 7AM–7PM CST',
    cta_es: 'Solicitar cotización →',
    cta_en: 'Request quote →',
    ctaHref: '#contacto',
    color: 'from-brand-burgundy/20 to-brand-burgundy/5',
    border: 'border-brand-burgundy/30',
    accent: 'text-brand-burgundy',
    iconBg: 'bg-brand-burgundy/10 border-brand-burgundy/20',
  },
  {
    id: 'loads',
    icon: Truck,
    category_es: 'Cargas Disponibles',
    category_en: 'Available Loads',
    title_es: 'Cargas Abiertas',
    title_en: 'Open Loads',
    description_es:
      'Consulta las cargas disponibles que podemos mover hoy mismo. Rutas optimizadas para cada tipo de mercancía.',
    description_en:
      'Check the available loads we can move today. Optimized routes for every cargo type.',
    phone: '+19153168488',
    phoneDisplay: '+1 (915) 316-8488',
    hours_es: 'Lun–Vie 7AM–7PM CST',
    hours_en: 'Mon–Fri 7AM–7PM CST',
    cta_es: 'Ver cargas →',
    cta_en: 'View loads →',
    ctaHref: '#cargas-disponibles',
    color: 'from-brand-burgundy/15 to-brand-burgundy/3',
    border: 'border-brand-burgundy/20',
    accent: 'text-brand-burgundy',
    iconBg: 'bg-brand-burgundy/8 border-brand-burgundy/15',
  }
]

export function ContactDirectSection() {
  const { locale } = useLocale()
  return (
    <section
      id="contacto-directo"
      className="py-24 lg:py-32 bg-[#070707] relative overflow-hidden"
      aria-labelledby="contact-direct-heading"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-burgundy/10 border border-brand-burgundy/20 rounded-full px-4 py-2 mb-6">
            <Phone className="w-3.5 h-3.5 text-brand-burgundy" aria-hidden="true" />
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">
              {locale === 'es' ? 'Contacto Directo' : 'Direct Contact'}
            </span>
          </div>
          <h2
            id="contact-direct-heading"
            className="font-display font-black text-white uppercase text-4xl sm:text-5xl lg:text-6xl leading-none mb-4"
          >
            {locale === 'es' ? 'Hablemos' : 'Let\'s Talk'} <span className="text-brand-burgundy">{locale === 'es' ? 'Ahora' : 'Now'}</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            {locale === 'es'
              ? 'Sin formularios, sin esperas. Llámanos directamente y obtén una respuesta inmediata.'
              : 'No forms, no waiting. Call us directly and get an immediate response.'}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {contacts.map((contact) => {
            const Icon = contact.icon
            const category = locale === 'es' ? contact.category_es : contact.category_en
            const title = locale === 'es' ? contact.title_es : contact.title_en
            const description = locale === 'es' ? contact.description_es : contact.description_en
            const hours = locale === 'es' ? contact.hours_es : contact.hours_en
            const cta = locale === 'es' ? contact.cta_es : contact.cta_en
            return (
              <article
                key={contact.id}
                className={`relative rounded-2xl border ${contact.border} bg-[#0d0d0d] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.24)] transition-transform duration-300 hover:-translate-y-1`}
                aria-label={`Contacto: ${title}`}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${contact.color}`}
                  aria-hidden="true"
                />

                <div className="relative p-8 lg:p-10">
                  {/* Category badge */}
                  <div
                    className={`inline-flex items-center gap-2 border rounded-full px-3 py-1.5 mb-6 ${contact.iconBg}`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${contact.accent}`} aria-hidden="true" />
                    <span className={`text-xs font-bold uppercase tracking-widest ${contact.accent}`}>
                      {category}
                    </span>
                  </div>

                  <h3 className="text-white font-display font-black text-3xl uppercase mb-4">
                    {title}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed mb-8">
                    {description}
                  </p>

                  {/* Phone number */}
                  <a
                    href={`tel:${contact.phone}`}
                    className={`phone-link flex items-center gap-4 mb-2 group`}
                    aria-label={`Llamar al número ${contact.phoneDisplay}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 ${contact.iconBg}`}
                    >
                      <Phone className={`w-5 h-5 ${contact.accent} group-hover:text-[#4c070f] transition-colors`} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">
                        {locale === 'es' ? 'Llama ahora' : 'Call now'}
                      </p>
                      <p className={`font-display font-black text-2xl sm:text-3xl ${contact.accent} group-hover:text-[#4c070f] transition-colors`}>
                        {contact.phoneDisplay}
                      </p>
                    </div>
                  </a>

                  {/* Hours */}
                  <div className="flex items-center gap-2 text-white/40 text-xs mb-8 ml-16">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                    <span>{hours}</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/10 mb-6" />

                  {/* Secondary CTA */}
                  <a
                    href={contact.ctaHref}
                    className="flex items-center gap-2 text-white/60 hover:text-brand-burgundy text-sm font-semibold transition-colors group"
                  >
                    <span>{cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-white/30 text-xs mt-10">
          {locale === 'es' ? 'También respondemos vía email a' : 'We also respond via email at'}{' '}
          <a
            href="mailto:info@premiumexpress.com"
            className="text-white/50 hover:text-brand-burgundy transition-colors underline"
          >
            info@premiumexpress.com
          </a>
        </p>
      </div>
    </section>
  )
}
