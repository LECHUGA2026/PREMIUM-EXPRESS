import { NextRequest, NextResponse } from 'next/server'
import { driverSchema, type DriverSchema } from '@/lib/driverSchema'
import nodemailer from 'nodemailer'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

function formatField(label: string, value: string | number | undefined) {
  return `<tr><td style="padding: 8px 0; vertical-align: top; font-weight: 600; color: #1a3a52; width: 220px">${label}</td><td style="padding: 8px 0; color: #334155;">${value ?? 'N/A'}</td></tr>`
}

function getValueLabel(value: string | number | undefined) {
  return value === undefined || value === null || value === '' ? 'N/A' : `${value}`
}

async function createDriverApplicationPdf(data: DriverSchema) {
  const pdfDoc = await PDFDocument.create()
  let page = pdfDoc.addPage([595.28, 841.89])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const textColor = rgb(0.07, 0.15, 0.3)
  const margin = 50
  const maxWidth = page.getWidth() - margin * 2
  const lineHeight = 16
  let y = page.getHeight() - margin

  const addPage = () => {
    page = pdfDoc.addPage([595.28, 841.89])
    y = page.getHeight() - margin
  }

  const ensureSpace = (needed: number) => {
    if (y - needed < margin) {
      addPage()
    }
  }

  const wrapText = (text: string, width: number, fontToUse: any, size: number) => {
    const words = text.split(' ')
    let line = ''
    const lines: string[] = []

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word
      const testWidth = fontToUse.widthOfTextAtSize(testLine, size)
      if (testWidth > width && line) {
        lines.push(line)
        line = word
      } else {
        line = testLine
      }
    }

    if (line) lines.push(line)
    return lines
  }

  const drawText = (text: string, x: number, fontToUse: any, size: number, color = textColor) => {
    page.drawText(text, { x, y, size, font: fontToUse, color })
  }

  const writeParagraph = (text: string, fontToUse: any, size: number, indent = 0) => {
    const lines = wrapText(text, maxWidth - indent, fontToUse, size)
    ensureSpace(lines.length * lineHeight + 4)
    for (const line of lines) {
      drawText(line, margin + indent, fontToUse, size)
      y -= lineHeight
    }
    y -= 4
  }

  const writeField = (label: string, value?: string | number) => {
    const displayValue = getValueLabel(value)
    ensureSpace(lineHeight * 3)
    drawText(`${label}:`, margin, boldFont, 10)
    y -= lineHeight
    writeParagraph(displayValue, font, 10, 10)
  }

  const writeSection = (title: string, fields: Array<{ label: string; value?: string | number }>) => {
    ensureSpace(lineHeight * 3)
    drawText(title, margin, boldFont, 14, rgb(0.1, 0.3, 0.6))
    y -= lineHeight * 1.5
    for (const field of fields) {
      writeField(field.label, field.value)
    }
    y -= lineHeight / 2
  }

  writeSection('Driver Application', [{ label: 'Company', value: 'Premium Express' }])
  writeSection('Contact Information', [
    { label: 'Name', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'Phone', value: data.phone },
    { label: 'Emergency Contact Name', value: data.emergencyContactName },
    { label: 'Emergency Contact Phone', value: data.emergencyContact },
  ])

  writeSection('Personal Information', [
    { label: 'Primary Language', value: data.primaryLanguage },
    { label: 'Language Percentage', value: data.languagePercentage != null ? `${data.languagePercentage}%` : undefined },
    { label: 'Years of Experience', value: data.yearsExperience },
  ])

  writeSection('Legal Status', [
    { label: 'Legal Status', value: data.legalStatus },
    { label: 'License', value: data.license },
    { label: 'Clean Record', value: data.cleanRecord },
  ])

  writeSection('Shift Preferences', [
    { label: 'Preferred Shift', value: data.shiftPreference },
    { label: 'Night Shift Issue', value: data.nightShiftIssue },
  ])

  writeSection('Driving Experience', [
    { label: 'Miles Per Day', value: data.milesPerDay },
    { label: 'OTR Days Max', value: data.otrDays },
    { label: 'Transmission', value: data.transmission },
    { label: 'Reefer Experience', value: data.reeferExperience },
  ])

  writeSection('Accidents & Incidents', [
    { label: 'Road Accidents', value: data.roadAccidents },
    { label: 'Driven All States', value: data.allStates },
    { label: 'States Not Driven', value: data.statesNotDrive },
  ])

  writeSection('Equipment & Technology', [
    { label: 'E-Logbook Used', value: data.elogbook },
    { label: 'DOT Inspection Knowledge', value: data.dotInspection },
    { label: 'Driven on Black Ice', value: data.blackIce },
    { label: 'Used Geotab', value: data.geotab },
    { label: 'Used Tire Chains', value: data.tireChains },
    { label: 'Driven in Storms', value: data.storms },
    { label: 'Know How to Put Tire Chains', value: data.tireChainSkill },
    { label: 'Road Repairs', value: data.roadRepairs },
  ])

  ensureSpace(lineHeight * 3)
  drawText('Generated by Premium Express Driver Application System.', margin, font, 10, rgb(0.4, 0.5, 0.6))

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes)
}

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ success: false, message: 'Method not allowed' }, { status: 405 })
  }

  try {
    const body = await req.json()

    // Validate with schema
    const validatedData = driverSchema.parse(body)

    // Honeypot check
    if (validatedData.honeypot) {
      return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 })
    }

    const customerEmail = validatedData.email?.trim()
    const adminEmail = process.env.ADMIN_EMAIL?.trim() || process.env.GMAIL_USER

    if (!customerEmail) {
      return NextResponse.json({ success: false, message: 'El email del usuario es inválido.' }, { status: 400 })
    }

    // Send email notification
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
        <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);">
          <div style="background: #0f172a; color: #ffffff; padding: 28px 32px;">
            <h1 style="margin: 0; font-size: 24px; letter-spacing: 0.02em;">Nueva Aplicación de Conductor</h1>
            <p style="margin: 10px 0 0; color: #cbd5e1; font-size: 14px;">Solicitud recibida desde el sitio de Premium Express.</p>
          </div>
          <div style="padding: 32px; color: #334155; font-size: 14px; line-height: 1.7;">
            <table style="width: 100%; border-collapse: collapse;">
              ${formatField('Nombre', validatedData.name)}
              ${formatField('Email', validatedData.email)}
              ${formatField('Teléfono', validatedData.phone)}
              ${formatField('Nombre de contacto de emergencia', validatedData.emergencyContactName)}
              ${formatField('Teléfono de contacto de emergencia', validatedData.emergencyContact)}
              <tr><td colspan="2" style="padding: 20px 0 8px; font-size: 16px; font-weight: 700; color: #0f172a;">Información Personal</td></tr>
              ${formatField('Idioma principal', validatedData.primaryLanguage)}
              ${formatField('Porcentaje de idioma', validatedData.languagePercentage != null ? `${validatedData.languagePercentage}%` : 'N/A')}
              ${formatField('Años de experiencia', validatedData.yearsExperience)}
              <tr><td colspan="2" style="padding: 20px 0 8px; font-size: 16px; font-weight: 700; color: #0f172a;">Estatus Legal</td></tr>
              ${formatField('Estatus legal', validatedData.legalStatus)}
              ${formatField('Licencia', validatedData.license)}
              ${formatField('Record limpio', validatedData.cleanRecord)}
              <tr><td colspan="2" style="padding: 20px 0 8px; font-size: 16px; font-weight: 700; color: #0f172a;">Preferencias</td></tr>
              ${formatField('Turno preferido', validatedData.shiftPreference)}
              ${formatField('Problema con turno de noche', validatedData.nightShiftIssue || 'N/A')}
              ${formatField('Millas por día', validatedData.milesPerDay)}
              ${formatField('Días OTR máximo', validatedData.otrDays)}
              ${formatField('Transmisión', validatedData.transmission)}
              ${formatField('Experiencia con reefer', validatedData.reeferExperience)}
              <tr><td colspan="2" style="padding: 20px 0 8px; font-size: 16px; font-weight: 700; color: #0f172a;">Accidentes e Incidentes</td></tr>
              ${formatField('Accidentes de carretera', validatedData.roadAccidents)}
              ${formatField('Ha manejado en todos los estados', validatedData.allStates)}
              ${formatField('Estados que no conduce', validatedData.statesNotDrive || 'N/A')}
              <tr><td colspan="2" style="padding: 20px 0 8px; font-size: 16px; font-weight: 700; color: #0f172a;">Equipo y Tecnología</td></tr>
              ${formatField('Libro electrónico usado', validatedData.elogbook || 'N/A')}
              ${formatField('Inspección DOT', validatedData.dotInspection)}
              ${formatField('Hielo seco', validatedData.blackIce)}
              ${formatField('Geotab', validatedData.geotab)}
              ${formatField('Cadenas para llantas', validatedData.tireChains)}
              ${formatField('Conducido en tormentas', validatedData.storms)}
              ${formatField('Sabe poner cadenas', validatedData.tireChainSkill)}
              ${formatField('Reparaciones en carretera', validatedData.roadRepairs || 'N/A')}
            </table>
          </div>
          <div style="background: #f8fafc; color: #475569; padding: 24px 32px; font-size: 13px;">
            <p style="margin: 0;">Se adjunta un PDF descargable con toda la información de la aplicación.</p>
          </div>
        </div>
      </div>
    `

    const pdfBuffer = await createDriverApplicationPdf(validatedData)

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: adminEmail,
      subject: `Nueva Aplicación de Conductor - ${validatedData.name}`,
      html: emailHtml,
      replyTo: customerEmail,
      attachments: [
        {
          filename: 'driver-application.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    })

    // Send confirmation email to the applicant
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a3a52;">Aplicación Recibida</h2>
        <p>Hola ${validatedData.name},</p>
        <p>Hemos recibido tu aplicación como conductor. Nuestro equipo la revisará y se pondrá en contacto contigo pronto.</p>
        <p>Gracias por tu interés en Premium Express.</p>
        <p style="color: #666; margin-top: 30px;">
          <small>Este es un email automático. Por favor no respondas a este correo.</small>
        </p>
      </div>
    `

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: customerEmail,
      subject: 'Aplicación de Conductor - Premium Express',
      html: confirmationHtml,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Aplicación enviada exitosamente',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Driver application error:', error)

    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Por favor completa todos los campos requeridos correctamente',
          errors: error.message,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Error al procesar la aplicación. Por favor intenta de nuevo más tarde.',
      },
      { status: 500 }
    )
  }
}
