'use server'
import nodemailer from 'nodemailer'
import type { ActionResult } from '@/types'
import { contactSchema, type ContactSchema } from '@/lib/contactSchema'

// ─── Simple in-memory rate limiting ──────────────────────────────────────────

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute window
  const maxRequests = 3

  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

// ─── Email template helper ────────────────────────────────────────────────────

function buildEmailHtml(data: ContactSchema): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nuevo Mensaje - Premium Express</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
      <div style="background: #050505; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">PREMIUM EXPRESS</h1>
        <p style="margin: 8px 0 0; color: #7a0d18; font-weight: 600;">Nuevo Mensaje de Contacto</p>
      </div>
      <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 140px;">Nombre</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0A1628;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #0A1628;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Teléfono</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #0A1628;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Mensaje</td>
            <td style="padding: 12px 0; color: #0A1628; line-height: 1.6;">${data.message}</td>
          </tr>
        </table>
      </div>
      <div style="background: #f9fafb; padding: 16px 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #9ca3af;">
          Enviado desde el formulario de contacto de PremiumExpress.com
        </p>
      </div>
    </body>
    </html>
  `
}

// ─── Server Action ────────────────────────────────────────────────────────────

export async function submitContactForm(
  formData: ContactSchema,
): Promise<ActionResult> {
  'use server'

  try {
    // 1. Honeypot check (spam prevention)
    if (formData.honeypot && formData.honeypot.length > 0) {
      // Silently succeed to not tip off bots
      return { success: true, message: 'Mensaje enviado correctamente.' }
    }

    // 2. Rate limit check (simulated IP — in production use headers())
    const simulatedIp = 'client-ip'
    if (!checkRateLimit(simulatedIp)) {
      return {
        success: false,
        message: 'Demasiados intentos. Por favor espera un momento antes de intentar de nuevo.',
      }
    }

    // 3. Server-side validation
    const parsed = contactSchema.safeParse(formData)
    if (!parsed.success) {
      return {
        success: false,
        message: 'Por favor revisa los campos del formulario.',
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      }
    }

    const data = parsed.data

    // 4. Email preparation and sending via Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'helamanalcalaing@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const emailPayload = {
      from: 'Premium Express <helamanalcalaing@gmail.com>',
      to: 'operations@premiumexpresslog.com',
      subject: `Nuevo mensaje de ${data.name}`,
      html: buildEmailHtml(data),
      replyTo: data.email,
    }

    // 5. Send email via Gmail
    const info = await transporter.sendMail(emailPayload)

    // Log success
    console.log('━━━ [Premium Express] ✅ Email enviado correctamente ━━━')
    console.log('Message ID:', info.messageId)
    console.log('To:', emailPayload.to)
    console.log('Subject:', emailPayload.subject)
    console.log('ReplyTo:', emailPayload.replyTo)
    console.log('From:', emailPayload.from)
    console.log('Data:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message.substring(0, 50) + '...',
    })
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return {
      success: true,
      message: 'Mensaje enviado. Nos pondremos en contacto pronto.',
    }
  } catch (error) {
    console.error('[ContactForm] Error:', error)
    return {
      success: false,
      message: 'Ocurrió un error al enviar el mensaje. Por favor intenta más tarde.',
    }
  }
}
