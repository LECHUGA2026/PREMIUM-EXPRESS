'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Send, User, Mail, Phone, MessageSquare, Loader2, CheckCircle, PhoneCall } from 'lucide-react'
import { useState } from 'react'
import { contactSchema, type ContactSchema } from '@/lib/contactSchema'
import { submitContactForm } from '@/lib/actions'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/LocaleContext'

interface InputFieldProps {
  label: string
  error?: string
  icon: React.ReactNode
  children: React.ReactNode
  required?: boolean
}

function InputField({ label, error, icon, children, required }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
        {label}
        {required && <span className="text-brand-burgundy ml-1">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          {icon}
        </div>
        {children}
      </div>
      {error && (
        <p className="text-red-500 text-xs font-medium flex items-center gap-1.5" role="alert">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const { t, locale } = useLocale()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      privacyAccepted: false,
      honeypot: '',
    },
  })

  const onSubmit = async (data: ContactSchema) => {
    try {
      const result = await submitContactForm(data)

      if (result.success) {
        setIsSubmitted(true)
        reset()
        toast.success(result.message, {
          duration: 6000,
          icon: '✅',
        })
      } else {
        toast.error(result.message, {
          duration: 5000,
          icon: '❌',
        })

        if (result.errors) {
          console.warn('Validation errors from server:', result.errors)
        }
      }
    } catch {
      toast.error(locale === 'es' ? 'Error de conexión. Por favor intenta más tarde.' : 'Connection error. Please try again later.', {
        duration: 5000,
        icon: '🔌',
      })
    }
  }

  return (
    <section
      id="contacto"
      className="py-24 lg:py-32 bg-[#070707]"
      aria-labelledby="contact-form-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 bg-brand-burgundy/10 border border-brand-burgundy/20 rounded-full px-4 py-2 mb-6">
              <span className="text-brand-burgundy text-xs font-bold uppercase tracking-widest">
                {locale === 'es' ? 'Contacto Directo' : 'Direct Contact'}
              </span>
            </div>

            <h2
              id="contact-form-heading"
              className="font-display font-black text-white uppercase text-4xl sm:text-5xl lg:text-6xl leading-none mb-6"
            >
              {locale === 'es'
                ? <>Hablemos de <span className="text-brand-burgundy">tu operación</span></>
                : <>Talk to our <span className="text-brand-burgundy">broker desk</span></>
              }
            </h2>

            <p className="text-white/60 text-lg leading-relaxed mb-10">
              {locale === 'es'
                ? 'Envía tus datos y te contactamos con la mejor opción para mover tu carga en Estados Unidos. Sin complicaciones, con prioridad y cobertura nacional.'
                : 'Send your info and we will reach out with the best option to move your freight across the U.S. Simple, premium and national coverage.'}
            </p>

            {/* Direct Phone Call */}
            <div className="bg-gradient-to-br from-brand-burgundy/10 to-brand-burgundy/5 border border-brand-burgundy/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-burgundy/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-6 h-6 text-brand-burgundy" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/70 font-medium mb-1">
                    {locale === 'es' ? '¿Prefieres hablar directamente?' : 'Prefer to talk directly?'}
                  </p>
                  <a
                    href="tel:+19153168488"
                    className="inline-flex items-center gap-2 text-brand-burgundy font-bold text-lg hover:text-brand-burgundy-dark transition-colors"
                  >
                    +1 (915) 316-8488
                  </a>
                  <p className="text-xs text-white/50 mt-2">Mon-Fri 7AM-7PM CST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {isSubmitted ? (
              /* Success State */
              <div className="bg-[#0e0e0e] rounded-2xl border border-white/10 p-12 text-center shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
                <div className="w-20 h-20 bg-brand-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-brand-burgundy" />
                </div>
                <h3 className="font-display font-black text-white text-3xl uppercase mb-3">
                  {locale === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!'}
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {locale === 'es'
                    ? 'Hemos recibido tu solicitud. Nuestro equipo te contactará en los próximos 2 días hábiles.'
                    : 'We have received your request. Our team will contact you within the next 2 business days.'}
                </p>
                <a
                  href="tel:+19153168488"
                  className="inline-flex items-center gap-2 bg-brand-burgundy text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-burgundy-dark transition-colors uppercase tracking-wide text-sm mr-4"
                >
                  <Phone className="w-4 h-4" />
                  {locale === 'es' ? 'Llamar ahora' : 'Call Now'}
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors underline"
                >
                  {locale === 'es' ? 'Enviar otra solicitud' : 'Send another request'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#0b0b0b] rounded-2xl border border-white/10 p-8 lg:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.25)] space-y-6"
                noValidate
                aria-label="Formulario de contacto"
              >
                {/* Honeypot field - hidden from real users */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('honeypot')}
                  />
                </div>

                {/* Name & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField label={t.form.name} error={errors.name?.message} icon={<User className="w-4 h-4" />} required>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder={locale === 'es' ? "Juan García" : "John Smith"}
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-lg border border-slate-800 bg-[#0d0d0d] text-white text-sm font-medium placeholder:text-gray-500 transition-all focus:border-brand-burgundy focus:bg-[#111111]',
                        errors.name
                          ? 'border-red-500 bg-[#3b0f13] focus:border-red-500'
                          : 'border-slate-800 bg-[#0d0d0d] focus:border-brand-burgundy focus:bg-[#111111]',
                      )}
                      {...register('name')}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                  </InputField>

                  <InputField label={t.form.email} error={errors.email?.message} icon={<Mail className="w-4 h-4" />} required>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="example@company.com"
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-lg border border-slate-800 bg-[#0d0d0d] text-white text-sm font-medium placeholder:text-gray-500 transition-all focus:border-brand-burgundy focus:bg-[#111111]',
                        errors.email
                          ? 'border-red-500 bg-[#3b0f13] focus:border-red-500'
                          : 'border-slate-800 bg-[#0d0d0d] focus:border-brand-burgundy focus:bg-[#111111]',
                      )}
                      {...register('email')}
                      aria-invalid={!!errors.email}
                    />
                  </InputField>
                </div>

                {/* Phone */}
                <InputField label={t.form.phone} error={errors.phone?.message} icon={<Phone className="w-4 h-4" />} required>
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 (555) 000-0000"
                    className={cn(
                      'w-full pl-10 pr-4 py-3 rounded-lg border border-slate-800 bg-[#0d0d0d] text-white text-sm font-medium placeholder:text-gray-500 transition-all focus:border-brand-burgundy focus:bg-[#111111]',
                      errors.phone
                        ? 'border-red-500 bg-[#3b0f13] focus:border-red-500'
                        : 'border-slate-800 bg-[#0d0d0d] focus:border-brand-burgundy focus:bg-[#111111]',
                    )}
                    {...register('phone')}
                    aria-invalid={!!errors.phone}
                  />
                </InputField>

                {/* Cargo Type */}
                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-white/80 uppercase tracking-wide">
                    {t.form.message} <span className="text-brand-burgundy">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" aria-hidden="true" />
                    <textarea
                      rows={5}
                      placeholder={locale === 'es'
                        ? "Cuéntanos sobre tu carga: origen, destino, peso aproximado, frecuencia de envíos y cualquier requerimiento especial..."
                        : "Tell us about your cargo: origin, destination, approximate weight, shipment frequency, and any special requirements..."}
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-lg border border-slate-800 bg-[#0d0d0d] text-white text-sm font-medium placeholder:text-gray-500 transition-all resize-none focus:border-brand-burgundy focus:bg-[#111111]',
                        errors.message
                          ? 'border-red-500 bg-[#3b0f13] focus:border-red-500'
                          : 'border-slate-800 bg-[#0d0d0d] focus:border-brand-burgundy focus:bg-[#111111]',
                      )}
                      {...register('message')}
                      aria-invalid={!!errors.message}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-xs font-medium" role="alert">
                      ⚠ {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Privacy Checkbox */}
                <div className="space-y-1.5">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded accent-brand-burgundy"
                        {...register('privacyAccepted')}
                        aria-invalid={!!errors.privacyAccepted}
                      />
                    </div>
                    <span className="text-gray-500 text-sm leading-relaxed">
                      {locale === 'es'
                        ? 'He leído y acepto la Política de Privacidad y el Aviso Legal. Autorizo a Premium Express a contactarme con información sobre sus servicios.'
                        : 'I have read and accept the Privacy Policy and Legal Notice. I authorize Premium Express to contact me with information about their services.'}
                      {' '}
                      <a href="#" className="text-brand-burgundy hover:underline font-medium">
                        {locale === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
                      </a>{' '}
                      {locale === 'es' ? 'y el' : 'and the'}{' '}
                      <a href="#" className="text-brand-burgundy hover:underline font-medium">
                        {locale === 'es' ? 'Aviso Legal' : 'Legal Notice'}
                      </a>
                      .
                    </span>
                  </label>
                  {errors.privacyAccepted && (
                    <p className="text-red-500 text-xs font-medium ml-7" role="alert">
                      ⚠ {errors.privacyAccepted.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'w-full flex items-center justify-center gap-3 bg-brand-burgundy hover:bg-brand-burgundy-dark text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 uppercase tracking-wide text-sm border-2 border-white',
                    'hover:shadow-xl hover:shadow-[0_20px_70px_rgba(122,13,24,0.3)] hover:-translate-y-0.5',
                    isSubmitting && 'opacity-70 cursor-not-allowed hover:translate-y-0 hover:shadow-none',
                  )}
                  aria-live="polite"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      {locale === 'es' ? 'Enviando solicitud...' : 'Sending request...'}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      {t.form.submit}
                    </>
                  )}
                </button>

                <p className="text-center text-gray-400 text-xs">
                  {locale === 'es'
                    ? '🔒 Tu información está protegida. No compartimos datos con terceros.'
                    : '🔒 Your information is protected. We do not share data with third parties.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
