import { z } from 'zod'

export const driverSchema = z.object({
  // Contact Info
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'El nombre solo puede contener letras'),

  email: z
    .string()
    .email('Por favor ingresa un email válido')
    .max(254, 'El email es demasiado largo'),

  phone: z
    .string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(20, 'El teléfono es demasiado largo')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Formato de teléfono inválido'),

  emergencyContact: z
    .string()
    .min(10, 'El contacto de emergencia debe tener al menos 10 dígitos')
    .max(20, 'El contacto de emergencia es demasiado largo')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Formato de teléfono inválido'),

  emergencyContactName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'El nombre solo puede contener letras'),

  // Personal Info
  primaryLanguage: z.enum(['english', 'spanish', 'other'], {
    errorMap: () => ({ message: 'Selecciona el idioma principal' }),
  }),

  languagePercentage: z
    .number()
    .min(0)
    .max(100)
    .optional(),

  yearsExperience: z
    .number()
    .min(0, 'Debe ser un número mayor o igual a 0')
    .max(70, 'Debe ser un número válido'),

  // Legal Status
  legalStatus: z.enum(['resident_citizen', 'permanent_resident', 'work_permit', 'other'], {
    errorMap: () => ({ message: 'Selecciona tu estatus legal' }),
  }),

  license: z.enum(['mx_cdl', 'us_cdl', 'both'], {
    errorMap: () => ({ message: 'Selecciona el tipo de licencia' }),
  }),

  cleanRecord: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Selecciona si tienes un record limpio' }),
  }),

  // Shift Preferences
  shiftPreference: z.enum(['day', 'night', 'both'], {
    errorMap: () => ({ message: 'Selecciona tu turno preferido' }),
  }),

  nightShiftIssue: z
    .string()
    .max(500, 'La respuesta es demasiado larga')
    .optional(),

  // Driving Experience
  milesPerDay: z
    .number()
    .min(0, 'Debe ser un número mayor o igual a 0')
    .max(10000, 'Ingresa un número válido'),

  otrDays: z
    .number()
    .min(0, 'Debe ser un número mayor o igual a 0')
    .max(30, 'Debe ser 30 días o menos'),

  transmission: z.enum(['automatic', 'manual', 'both'], {
    errorMap: () => ({ message: 'Selecciona el tipo de transmisión' }),
  }),

  reeferExperience: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Selecciona si tienes experiencia con reefer' }),
  }),

  // Accidents & Incidents
  roadAccidents: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Selecciona si has tenido accidentes' }),
  }),

  allStates: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Selecciona si has manejado en todos los estados' }),
  }),

  statesNotDrive: z
    .string()
    .max(500, 'La lista de estados es demasiado larga')
    .optional(),

  // Equipment & Tech
  elogbook: z
    .string()
    .max(100, 'El campo es demasiado largo')
    .optional(),

  dotInspection: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Selecciona si sabes cómo hacer una inspección DOT' }),
  }),

  blackIce: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Selecciona tu experiencia con hielo seco' }),
  }),

  geotab: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Selecciona si has usado Geotab' }),
  }),

  tireChains: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Selecciona si has usado cadenas' }),
  }),

  storms: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Selecciona si has manejado en tormentas' }),
  }),

  tireChainSkill: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Selecciona si sabes poner cadenas' }),
  }),

  roadRepairs: z
    .string()
    .max(1000, 'La lista de reparaciones es demasiado larga')
    .optional(),

  // Consent
  privacyAccepted: z.boolean().refine((value) => value === true, {
    message: 'Debes aceptar la política de privacidad',
  }),

  honeypot: z.string().max(0, 'Bot detected').optional(),
})

export type DriverSchema = z.infer<typeof driverSchema>
