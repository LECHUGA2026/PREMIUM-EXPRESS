import { z } from 'zod'

export const contactSchema = z.object({
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

  message: z
    .string()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(2000, 'El mensaje es demasiado largo'),

  privacyAccepted: z.boolean().refine((value) => value === true, {
    message: 'Debes aceptar la política de privacidad',
  }),

  honeypot: z.string().max(0, 'Bot detected').optional(),
})

export type ContactSchema = z.infer<typeof contactSchema>
