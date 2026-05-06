'use client'

import { useLocale } from '@/lib/LocaleContext'

export function NosotrosSection() {
  const { locale } = useLocale()
  const ownerName = 'Carlos Rivera' // CAMBIA ESTE NOMBRE EN EL CÓDIGO SI QUIERES

  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-[#050505] text-white" aria-labelledby="nosotros-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-burgundy/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-brand-burgundy mb-6">
            {locale === 'es' ? 'Nosotros' : 'About Us'}
          </div>
          <h2 id="nosotros-heading" className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            {locale === 'es' ? 'Nuestra historia y valores' : 'Our story and values'}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            {locale === 'es'
              ? 'Premium Express nació hace cuatro años como una apuesta por el transporte confiable y el servicio humano en toda la ruta de Estados Unidos.'
              : 'Premium Express was born four years ago as a commitment to reliable freight and human-centered service across the U.S. route.'}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-burgundy mb-3">{locale === 'es' ? 'Fundación' : 'Founded'}</p>
            <h3 className="text-2xl font-semibold text-white mb-4">{locale === 'es' ? '2022' : '2022'}</h3>
            <p className="text-white/60 leading-relaxed">
              {locale === 'es'
                ? 'Desde sus inicios en 2022, la empresa creció con rutas claves y relaciones de confianza con transportistas valiosos.'
                : 'Since its start in 2022, the company has grown with key routes and trusted relationships with valuable carriers.'}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-burgundy mb-3">{locale === 'es' ? 'Liderazgo' : 'Leadership'}</p>
            <h3 className="text-2xl font-semibold text-white mb-4">{ownerName}</h3>
            <p className="text-white/60 leading-relaxed">
              {locale === 'es'
                ? 'Nuestro fundador puso en marcha la compañía con el objetivo de ofrecer servicio premium, transparencia y respuesta rápida en cada envío.'
                : 'Our founder launched the company with the goal of delivering premium service, transparency, and fast responses for every shipment.'}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-burgundy mb-3">{locale === 'es' ? 'Compromiso' : 'Commitment'}</p>
            <h3 className="text-2xl font-semibold text-white mb-4">{locale === 'es' ? 'Cobertura total' : 'Full coverage'}</h3>
            <p className="text-white/60 leading-relaxed">
              {locale === 'es'
                ? 'Con presencia en los 48 estados contiguos, cada envío se gestiona con cuidado y con la promesa de mover tu carga con máxima seguridad.'
                : 'With presence across the 48 contiguous states, every shipment is handled with care and the promise to move your freight with maximum safety.'}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-8">
            <p className="text-brand-burgundy uppercase tracking-[0.35em] text-sm mb-3">{locale === 'es' ? 'Historia' : 'History'}</p>
            <p className="text-white/60 leading-relaxed">
              {locale === 'es'
                ? 'Comenzamos como un pequeño equipo en 2022, y en cuatro años hemos fortalecido nuestra red de socios, mejorado la experiencia del cliente y llevado despacho premium a cada ruta.'
                : 'We started as a small team in 2022, and in four years we have strengthened our partner network, improved the customer experience, and brought premium dispatch to every route.'}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-8">
            <p className="text-brand-burgundy uppercase tracking-[0.35em] text-sm mb-3">{locale === 'es' ? 'Valores' : 'Values'}</p>
            <p className="text-white/60 leading-relaxed">
              {locale === 'es'
                ? 'La honestidad, el compromiso y el trato personalizado guían cada decisión. Nuestro objetivo es que cada cliente sienta que su carga es también nuestra prioridad.'
                : 'Honesty, commitment, and personalized care guide every decision. Our goal is for each customer to feel their freight is our priority too.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
