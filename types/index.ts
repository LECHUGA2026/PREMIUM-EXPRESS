export type CargoType = 'dry' | 'reefer' | 'both'

export interface ContactFormData {
  name: string
  email: string
  phone: string
  cargoType: CargoType
  message: string
  privacyAccepted: boolean
  honeypot?: string // spam prevention
}

export interface ActionResult {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}
