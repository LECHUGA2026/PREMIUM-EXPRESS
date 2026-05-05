'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Send, User, Mail, Phone, Loader2, CheckCircle, FileText } from 'lucide-react'
import { useState } from 'react'
import { driverSchema, type DriverSchema } from '@/lib/driverSchema'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/LocaleContext'

interface InputFieldProps {
  label: string
  error?: string
  icon: React.ReactNode
  children: React.ReactNode
  required?: boolean
  helpText?: string
}

function InputField({ label, error, icon, children, required, helpText }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-brand-navy/80 uppercase tracking-wide">
        {label}
        {required && <span className="text-brand-orange ml-1">*</span>}
      </label>
      {helpText && <p className="text-xs text-gray-500 mb-2">{helpText}</p>}
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
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

function SelectField({
  label,
  error,
  options,
  children,
  required,
}: {
  label: string
  error?: string
  options?: { value: string; label: string }[]
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-brand-navy/80 uppercase tracking-wide">
        {label}
        {required && <span className="text-brand-orange ml-1">*</span>}
      </label>
      <div>{children}</div>
      {error && (
        <p className="text-red-500 text-xs font-medium flex items-center gap-1.5" role="alert">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}

export function DriverApplicationForm() {
  const { t, locale } = useLocale()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DriverSchema>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      emergencyContact: '',
      emergencyContactName: '',
      primaryLanguage: 'english',
      yearsExperience: 0,
      legalStatus: 'resident_citizen',
      license: 'us_cdl',
      cleanRecord: 'yes',
      shiftPreference: 'day',
      milesPerDay: 0,
      otrDays: 0,
      transmission: 'automatic',
      reeferExperience: 'no',
      roadAccidents: 'no',
      allStates: 'no',
      dotInspection: 'no',
      blackIce: 'no',
      geotab: 'no',
      tireChains: 'no',
      storms: 'no',
      tireChainSkill: 'no',
      privacyAccepted: false,
      honeypot: '',
    },
  })

  const onSubmit = async (data: DriverSchema) => {
    try {
      const response = await fetch('/api/driver-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        reset()
        toast.success(result.message || t.driver.success, {
          duration: 6000,
          icon: '✅',
        })
      } else {
        toast.error(result.message || t.driver.error, {
          duration: 5000,
          icon: '❌',
        })
      }
    } catch {
      toast.error(locale === 'es' ? 'Error de conexión. Por favor intenta más tarde.' : 'Connection error. Please try again later.', {
        duration: 5000,
        icon: '🔌',
      })
    }
  }

  return (
    <>
      {isSubmitted ? (
        <div className="bg-white rounded-2xl border border-green-100 p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="font-display font-black text-brand-navy text-3xl uppercase mb-3">
            {locale === 'es' ? '¡Aplicación Enviada!' : 'Application Sent!'}
          </h3>
          <p className="text-gray-500 mb-8 leading-relaxed">
            {locale === 'es'
              ? 'Hemos recibido tu aplicación. Nuestro equipo te contactará pronto.'
              : 'We have received your application. Our team will contact you soon.'}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-gray-400 hover:text-brand-navy text-sm font-medium transition-colors underline"
          >
            {locale === 'es' ? 'Enviar otra aplicación' : 'Submit another application'}
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl border border-gray-100 p-8 lg:p-10 shadow-sm space-y-8"
          noValidate
          aria-label="Formulario de aplicación de conductor"
        >
          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <input type="text" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
          </div>

          {/* Section 1: Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-brand-navy mb-4 uppercase tracking-wide">
              {locale === 'es' ? 'Información de Contacto' : 'Contact Information'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label={t.driver.name} error={errors.name?.message} icon={<User className="w-4 h-4" />} required>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder={locale === 'es' ? 'Juan García' : 'John Smith'}
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-lg border text-brand-navy text-sm font-medium placeholder:text-gray-300 transition-all',
                    errors.name
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('name')}
                />
              </InputField>

              <InputField label={t.driver.email} error={errors.email?.message} icon={<Mail className="w-4 h-4" />} required>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="example@email.com"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-lg border text-brand-navy text-sm font-medium placeholder:text-gray-300 transition-all',
                    errors.email
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('email')}
                />
              </InputField>

              <InputField
                label={t.driver.phone}
                error={errors.phone?.message}
                icon={<Phone className="w-4 h-4" />}
                required
                helpText={locale === 'es' ? '(Celular Americano)' : '(US Cell Phone)'}
              >
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (555) 000-0000"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-lg border text-brand-navy text-sm font-medium placeholder:text-gray-300 transition-all',
                    errors.phone
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('phone')}
                />
              </InputField>

              <InputField
                label={t.driver.emergencyContactName}
                error={errors.emergencyContactName?.message}
                icon={<User className="w-4 h-4" />}
                required
              >
                <input
                  type="text"
                  placeholder={locale === 'es' ? 'Nombre del contacto' : 'Contact name'}
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-lg border text-brand-navy text-sm font-medium placeholder:text-gray-300 transition-all',
                    errors.emergencyContactName
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('emergencyContactName')}
                />
              </InputField>

              <InputField
                label={t.driver.emergencyContact}
                error={errors.emergencyContact?.message}
                icon={<Phone className="w-4 h-4" />}
                required
              >
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-lg border text-brand-navy text-sm font-medium placeholder:text-gray-300 transition-all',
                    errors.emergencyContact
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('emergencyContact')}
                />
              </InputField>
            </div>
          </div>

          {/* Section 2: Personal Information */}
          <div>
            <h3 className="text-lg font-bold text-brand-navy mb-4 uppercase tracking-wide">
              {locale === 'es' ? 'Información Personal' : 'Personal Information'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SelectField label={t.driver.primaryLanguage} error={errors.primaryLanguage?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.primaryLanguage
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('primaryLanguage')}
                >
                  <option value="english">{locale === 'es' ? 'Inglés' : 'English'}</option>
                  <option value="spanish">{locale === 'es' ? 'Español' : 'Spanish'}</option>
                  <option value="other">{locale === 'es' ? 'Otro' : 'Other'}</option>
                </select>
              </SelectField>

              <InputField
                label={t.driver.languagePercentage}
                error={errors.languagePercentage?.message}
                icon={<FileText className="w-4 h-4" />}
              >
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="75"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-lg border text-brand-navy text-sm font-medium placeholder:text-gray-300 transition-all',
                    errors.languagePercentage
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('languagePercentage', { valueAsNumber: true })}
                />
              </InputField>

              <InputField
                label={t.driver.yearsExperience}
                error={errors.yearsExperience?.message}
                icon={<FileText className="w-4 h-4" />}
                required
              >
                <input
                  type="number"
                  min="0"
                  placeholder="5"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-lg border text-brand-navy text-sm font-medium placeholder:text-gray-300 transition-all',
                    errors.yearsExperience
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('yearsExperience', { valueAsNumber: true })}
                />
              </InputField>
            </div>
          </div>

          {/* Section 3: Legal Status */}
          <div>
            <h3 className="text-lg font-bold text-brand-navy mb-4 uppercase tracking-wide">
              {locale === 'es' ? 'Estatus Legal' : 'Legal Status'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SelectField label={t.driver.legalStatus} error={errors.legalStatus?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.legalStatus
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('legalStatus')}
                >
                  <option value="resident_citizen">{t.driver.legalStatus_resident}</option>
                  <option value="permanent_resident">{t.driver.legalStatus_permanent}</option>
                  <option value="work_permit">{t.driver.legalStatus_permit}</option>
                  <option value="other">{t.driver.legalStatus_other}</option>
                </select>
              </SelectField>

              <SelectField label={t.driver.license} error={errors.license?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.license
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('license')}
                >
                  <option value="us_cdl">{t.driver.license_us}</option>
                  <option value="mx_cdl">{t.driver.license_mx}</option>
                  <option value="both">{t.driver.license_both}</option>
                </select>
              </SelectField>

              <SelectField label={t.driver.cleanRecord} error={errors.cleanRecord?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.cleanRecord
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('cleanRecord')}
                >
                  <option value="yes">{locale === 'es' ? 'Sí' : 'Yes'}</option>
                  <option value="no">{locale === 'es' ? 'No' : 'No'}</option>
                </select>
              </SelectField>
            </div>
          </div>

          {/* Section 4: Shift Preferences */}
          <div>
            <h3 className="text-lg font-bold text-brand-navy mb-4 uppercase tracking-wide">
              {locale === 'es' ? 'Preferencia de Turno' : 'Shift Preferences'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SelectField label={t.driver.shiftPreference} error={errors.shiftPreference?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.shiftPreference
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('shiftPreference')}
                >
                  <option value="day">{t.driver.shift_day}</option>
                  <option value="night">{t.driver.shift_night}</option>
                  <option value="both">{t.driver.shift_both}</option>
                </select>
              </SelectField>

              <InputField label={t.driver.nightShiftIssue} error={errors.nightShiftIssue?.message} icon={<FileText className="w-4 h-4" />}>
                <textarea
                  placeholder={locale === 'es' ? 'Describe el problema...' : 'Describe the issue...'}
                  rows={1}
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-lg border text-brand-navy text-sm font-medium placeholder:text-gray-300 transition-all resize-none',
                    errors.nightShiftIssue
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('nightShiftIssue')}
                />
              </InputField>
            </div>
          </div>

          {/* Section 5: Driving Experience */}
          <div>
            <h3 className="text-lg font-bold text-brand-navy mb-4 uppercase tracking-wide">
              {locale === 'es' ? 'Experiencia de Manejo' : 'Driving Experience'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label={t.driver.milesPerDay} error={errors.milesPerDay?.message} icon={<FileText className="w-4 h-4" />} required>
                <input
                  type="number"
                  min="0"
                  placeholder="500"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-lg border text-brand-navy text-sm font-medium placeholder:text-gray-300 transition-all',
                    errors.milesPerDay
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('milesPerDay', { valueAsNumber: true })}
                />
              </InputField>

              <InputField label={t.driver.otrDays} error={errors.otrDays?.message} icon={<FileText className="w-4 h-4" />} required>
                <input
                  type="number"
                  min="0"
                  max="30"
                  placeholder="14"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-lg border text-brand-navy text-sm font-medium placeholder:text-gray-300 transition-all',
                    errors.otrDays
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('otrDays', { valueAsNumber: true })}
                />
              </InputField>

              <SelectField label={t.driver.transmission} error={errors.transmission?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.transmission
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('transmission')}
                >
                  <option value="automatic">{t.driver.transmission_auto}</option>
                  <option value="manual">{t.driver.transmission_manual}</option>
                  <option value="both">{t.driver.transmission_both}</option>
                </select>
              </SelectField>

              <SelectField label={t.driver.reeferExperience} error={errors.reeferExperience?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.reeferExperience
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('reeferExperience')}
                >
                  <option value="yes">{locale === 'es' ? 'Sí' : 'Yes'}</option>
                  <option value="no">{locale === 'es' ? 'No' : 'No'}</option>
                </select>
              </SelectField>
            </div>
          </div>

          {/* Section 6: Accidents & Incidents */}
          <div>
            <h3 className="text-lg font-bold text-brand-navy mb-4 uppercase tracking-wide">
              {locale === 'es' ? 'Accidentes e Incidentes' : 'Accidents & Incidents'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SelectField label={t.driver.roadAccidents} error={errors.roadAccidents?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.roadAccidents
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('roadAccidents')}
                >
                  <option value="yes">{locale === 'es' ? 'Sí' : 'Yes'}</option>
                  <option value="no">{locale === 'es' ? 'No' : 'No'}</option>
                </select>
              </SelectField>

              <SelectField label={t.driver.allStates} error={errors.allStates?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.allStates
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('allStates')}
                >
                  <option value="yes">{locale === 'es' ? 'Sí' : 'Yes'}</option>
                  <option value="no">{locale === 'es' ? 'No' : 'No'}</option>
                </select>
              </SelectField>

              <InputField label={t.driver.statesNotDrive} error={errors.statesNotDrive?.message} icon={<FileText className="w-4 h-4" />}>
                <textarea
                  placeholder={locale === 'es' ? 'TX, CA, FL...' : 'TX, CA, FL...'}
                  rows={2}
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-lg border text-brand-navy text-sm font-medium placeholder:text-gray-300 transition-all resize-none',
                    errors.statesNotDrive
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('statesNotDrive')}
                />
              </InputField>
            </div>
          </div>

          {/* Section 7: Equipment & Tech */}
          <div>
            <h3 className="text-lg font-bold text-brand-navy mb-4 uppercase tracking-wide">
              {locale === 'es' ? 'Equipo y Tecnología' : 'Equipment & Technology'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label={t.driver.elogbook} error={errors.elogbook?.message} icon={<FileText className="w-4 h-4" />}>
                <input
                  type="text"
                  placeholder={locale === 'es' ? 'e.g., ALOGMAX' : 'e.g., ALOGMAX'}
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-lg border text-brand-navy text-sm font-medium placeholder:text-gray-300 transition-all',
                    errors.elogbook
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('elogbook')}
                />
              </InputField>

              <SelectField label={t.driver.dotInspection} error={errors.dotInspection?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.dotInspection
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('dotInspection')}
                >
                  <option value="yes">{locale === 'es' ? 'Sí' : 'Yes'}</option>
                  <option value="no">{locale === 'es' ? 'No' : 'No'}</option>
                </select>
              </SelectField>

              <SelectField label={t.driver.blackIce} error={errors.blackIce?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.blackIce
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('blackIce')}
                >
                  <option value="yes">{locale === 'es' ? 'Sí' : 'Yes'}</option>
                  <option value="no">{locale === 'es' ? 'No' : 'No'}</option>
                </select>
              </SelectField>

              <SelectField label={t.driver.geotab} error={errors.geotab?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.geotab
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('geotab')}
                >
                  <option value="yes">{locale === 'es' ? 'Sí' : 'Yes'}</option>
                  <option value="no">{locale === 'es' ? 'No' : 'No'}</option>
                </select>
              </SelectField>

              <SelectField label={t.driver.tireChains} error={errors.tireChains?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.tireChains
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('tireChains')}
                >
                  <option value="yes">{locale === 'es' ? 'Sí' : 'Yes'}</option>
                  <option value="no">{locale === 'es' ? 'No' : 'No'}</option>
                </select>
              </SelectField>

              <SelectField label={t.driver.storms} error={errors.storms?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.storms
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('storms')}
                >
                  <option value="yes">{locale === 'es' ? 'Sí' : 'Yes'}</option>
                  <option value="no">{locale === 'es' ? 'No' : 'No'}</option>
                </select>
              </SelectField>

              <SelectField label={t.driver.tireChainSkill} error={errors.tireChainSkill?.message} required>
                <select
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-brand-navy text-sm font-medium transition-all',
                    errors.tireChainSkill
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('tireChainSkill')}
                >
                  <option value="yes">{locale === 'es' ? 'Sí' : 'Yes'}</option>
                  <option value="no">{locale === 'es' ? 'No' : 'No'}</option>
                </select>
              </SelectField>

              <InputField label={t.driver.roadRepairs} error={errors.roadRepairs?.message} icon={<FileText className="w-4 h-4" />}>
                <textarea
                  placeholder={locale === 'es' ? 'Describe las reparaciones...' : 'Describe repairs...'}
                  rows={2}
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-lg border text-brand-navy text-sm font-medium placeholder:text-gray-300 transition-all resize-none',
                    errors.roadRepairs
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange',
                  )}
                  {...register('roadRepairs')}
                />
              </InputField>
            </div>
          </div>

          {/* Privacy & Submit */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className={cn('w-5 h-5 mt-0.5 accent-brand-orange rounded cursor-pointer', errors.privacyAccepted && 'border-red-500')}
                {...register('privacyAccepted')}
              />
              <span className="text-sm text-gray-600">
                {t.driver.privacy}
                <span className="text-brand-orange ml-1">*</span>
              </span>
            </label>
            {errors.privacyAccepted && (
              <p className="text-red-500 text-xs font-medium flex items-center gap-1.5">
                <span>⚠</span> {errors.privacyAccepted.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'w-full bg-brand-orange text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wide text-sm transition-all flex items-center justify-center gap-2',
                isSubmitting
                  ? 'opacity-75 cursor-not-allowed'
                  : 'hover:bg-brand-orange-dark active:scale-95',
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {locale === 'es' ? 'Enviando...' : 'Submitting...'}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t.driver.submit}
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </>
  )
}
