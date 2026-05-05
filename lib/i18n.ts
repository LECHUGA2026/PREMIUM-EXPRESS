export const defaultLocale = 'es'
export const locales = ['es', 'en'] as const
export type Locale = (typeof locales)[number]

export const translations = {
  es: {
    // Navbar
    navbar: {
      home: 'Inicio',
      services: 'Servicios',
      about: 'Nosotros',
      contact: 'Contacto',
      language: 'Idioma',
      phone: '+1 (915) 316-8488',
    },
    // Hero
    hero: {
      badge: '48 Estados Contiguos · 24/7',
      headline1: 'Transportando',
      headline2: 'Confianza',
      headline3: 'A Todo Estados Unidos',
      subheadline: 'Especialistas en corretaje de carga para Estados Unidos con foco en eficiencia, seguridad y servicio premium.',
      cta: 'Contacta Ahora',
      cta_talk: 'Llámanos',
      scroll: 'Desplázate para explorar',
      years: 'Años de experiencia',
      states: 'Estados cubiertos',
      ontime: 'Entregas a tiempo',
    },
    // Services
    services: {
      title: 'Nuestros Servicios',
      dry: {
        name: 'Carga Seca',
        description: 'Transporte seguro de mercancía seca con cobertura completa.',
      },
      reefer: {
        name: 'Carga Refrigerada',
        description: 'Transporte de productos perecederos con control de temperatura.',
      },
      logistics: {
        name: 'Logística Integral',
        description: 'Soluciones completas de logística y distribución.',
      },
    },
    // Contact Direct
    contact: {
      title: 'Contacta Directamente',
      dispatch: 'Despacho',
      dispatch_desc: 'Para coordinar envíos',
      sales: 'Ventas',
      sales_desc: 'Para cotizaciones y preguntas',
      support: 'Soporte',
      support_desc: 'Disponible 24/7',
    },
    // Contact Form
    form: {
      title: 'Contáctanos',
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono',
      cargoType: 'Tipo de Carga',
      cargoType_dry: '🔷 Carga Seca (Dry Freight)',
      cargoType_dry_desc: 'Materiales, manufactura, palets',
      cargoType_reefer: '❄️ Carga Refrigerada (Reefer)',
      cargoType_reefer_desc: 'Alimentos, farmacéuticos, perecederos',
      cargoType_both: '📦 Ambos tipos de carga',
      cargoType_both_desc: 'Necesito las dos opciones',
      message: 'Mensaje',
      privacy: 'Acepto la política de privacidad',
      submit: 'Enviar Mensaje',
      success: 'Mensaje enviado exitosamente',
      error: 'Error al enviar. Intenta de nuevo.',
    },
    // Clients
    clients: {
      title: 'Nuestros Clientes',
    },
    // Footer
    footer: {
      company: 'PREMIUM EXPRESS',
      rights: 'Todos los derechos reservados',
      dispatch_phone: 'Despacho',
      dispatch_desc: 'Coordina tus envíos',
      dispatch_24: 'DISPATCH 24/7',
      dispatch_anytime: 'Coordina tus envíos en cualquier momento',
      about: 'Más de 15 años moviendo cargas a través de Estados Unidos con soluciones confiables para carga seca y refrigerada.',
      operating: 'Operando 24/7 · 48 estados',
      services: 'Servicios',
      dry: 'Carga Seca',
      reefer: 'Carga Refrigerada',
      coverage: 'Cobertura Nacional',
      fleet: 'Flota Propia',
      contact_header: 'Contacto',
      sales: 'Ventas',
      planing: 'Planning',
    },
    loads: {
      title: 'Cargas Disponibles',
      subtitle: 'Publicamos las cargas abiertas que podemos mover hoy mismo.',
      list: [
        {
          route_es: 'Houston → Chicago',
          route_en: 'Houston → Chicago',
          details_es: 'Carga seca - 42,000 lbs · 53\' trailer',
          details_en: 'Dry freight - 42,000 lbs · 53\' trailer',
        },
        {
          route_es: 'Miami → Atlanta',
          route_en: 'Miami → Atlanta',
          details_es: 'Reefer - 24 pallets · temperatura controlada',
          details_en: 'Reefer - 24 pallets · temperature controlled',
        },
        {
          route_es: 'Los Ángeles → Dallas',
          route_en: 'Los Angeles → Dallas',
          details_es: 'Carga mixta - 30,000 lbs · prioridad urgente',
          details_en: 'Mixed cargo - 30,000 lbs · urgent priority',
        },
      ],
    },
    // Driver Application
    driver: {
      title: 'Aplica Como Conductor',
      description: 'Completa el formulario de competencia del conductor y nos pondremos en contacto pronto.',
      badge: 'Oportunidades de Empleo',
      // Contact Info
      name: 'Nombre Completo',
      email: 'Email',
      phone: 'Teléfono (Celular Americano)',
      emergencyContact: 'Contacto de Emergencia',
      emergencyContactName: 'Nombre del Contacto de Emergencia',
      // Personal Info
      primaryLanguage: 'Idioma Principal',
      languagePercentage: '¿Qué porcentaje hablas este idioma?',
      yearsExperience: 'Años de Experiencia',
      // Legal Status
      legalStatus: 'Estatus Legal',
      legalStatus_resident: 'Residente Ciudadano',
      legalStatus_permanent: 'Residente Permanente',
      legalStatus_permit: 'Permiso de Trabajo',
      legalStatus_other: 'Otro',
      license: 'Licencia',
      license_mx: 'Licencia México CDL',
      license_us: 'Licencia EE.UU. CDL',
      license_both: 'Ambas Licencias',
      cleanRecord: '¿Tienes un record limpio?',
      // Shift Preferences
      shiftPreference: 'Turno Preferido',
      shift_day: 'Turno de Día',
      shift_night: 'Turno de Noche',
      shift_both: 'Ambos Turnos',
      nightShiftIssue: 'Si prefieres turno de día, ¿tienes algún problema si se requiere que manejes de noche?',
      // Driving Experience
      milesPerDay: '¿Cuántas millas conduces por día?',
      otrDays: '¿Cuántos días máximo puedes estar en carretera (OTR)?',
      transmission: 'Tipo de Transmisión que Manejas',
      transmission_auto: 'Automático',
      transmission_manual: 'Manual',
      transmission_both: 'Ambos',
      reeferExperience: '¿Has utilizado un trailer refrigerado?',
      // Accidents & Incidents
      roadAccidents: '¿Has tenido algún accidente de carretera?',
      allStates: '¿Has manejado en todos los estados?',
      statesNotDrive: '¿En qué estados no conduces?',
      // Equipment & Tech
      elogbook: '¿Qué libro electrónico has usado?',
      dotInspection: '¿Sabes cómo tener una inspección DOT?',
      blackIce: '¿Has conducido sobre hielo seco?',
      geotab: '¿Has usado Geotab?',
      tireChains: '¿Has usado cadenas para llantas?',
      storms: '¿Has conducido en tormentas?',
      tireChainSkill: '¿Sabes cómo poner cadenas para llantas?',
      roadRepairs: '¿Puedes realizar reparaciones en la carretera de camiones y remolques? (Menciónalos)',
      // Consent
      privacy: 'Acepto la política de privacidad y términos de aplicación',
      submit: 'Enviar Aplicación',
      success: 'Aplicación enviada exitosamente',
      error: 'Error al enviar. Intenta de nuevo.',
      toggleQuote: 'Solicitar Cotización',
      toggleDriver: 'Aplicar como Conductor',
    },
    // Chatbot
    chatbot: {
      title: 'Chatea con nosotros',
      placeholder: 'Escribe tu pregunta...',
      send: 'Enviar',
      close: 'Cerrar',
      loading: 'Cargando respuesta...',
      error: 'Error al enviar mensaje',
      help: '¿En qué puedo ayudarte?',
    },
  },
  en: {
    // Navbar
    navbar: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      language: 'Language',
      phone: '+1 (915) 316-8488',
    },
    // Hero
    hero: {
      badge: '48 Contiguous States · 24/7',
      headline1: 'Transporting',
      headline2: 'Trust',
      headline3: 'Across The United States',
      subheadline: 'Specialists in freight brokerage across the U.S. with a premium focus on speed, security, and full-service coordination.',
      cta: 'Contact Us',
      cta_talk: 'Call Us',
      scroll: 'Scroll to explore',
      years: 'Years of Experience',
      states: 'States Covered',
      ontime: 'On-Time Deliveries',
    },
    // Services
    services: {
      title: 'Our Services',
      dry: {
        name: 'Dry Freight',
        description: 'Safe transportation of dry goods with full coverage.',
      },
      reefer: {
        name: 'Refrigerated Freight',
        description: 'Transport of perishable products with temperature control.',
      },
      logistics: {
        name: 'Integrated Logistics',
        description: 'Complete logistics and distribution solutions.',
      },
    },
    loads: {
      title: 'Available Loads',
      subtitle: 'We share the loads we can move today so you can book quickly.',
      list: [
        {
          route_es: 'Houston → Chicago',
          route_en: 'Houston → Chicago',
          details_es: 'Carga seca - 42,000 lbs · 53\' trailer',
          details_en: 'Dry freight - 42,000 lbs · 53\' trailer',
        },
        {
          route_es: 'Miami → Atlanta',
          route_en: 'Miami → Atlanta',
          details_es: 'Reefer - 24 pallets · temperatura controlada',
          details_en: 'Reefer - 24 pallets · temperature controlled',
        },
        {
          route_es: 'Los Ángeles → Dallas',
          route_en: 'Los Angeles → Dallas',
          details_es: 'Carga mixta - 30,000 lbs · prioridad urgente',
          details_en: 'Mixed cargo - 30,000 lbs · urgent priority',
        },
      ],
    },
    // Contact Direct
    contact: {
      title: 'Contact Us Directly',
      dispatch: 'Dispatch',
      dispatch_desc: 'To coordinate shipments',
      sales: 'Sales',
      sales_desc: 'For quotes and inquiries',
      support: 'Support',
      support_desc: '24/7 available',
    },
    // Contact Form
    form: {
      title: 'Request Your Quote',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      cargoType: 'Cargo Type',
      cargoType_dry: '🔷 Dry Freight',
      cargoType_dry_desc: 'Materials, manufacturing, pallets',
      cargoType_reefer: '❄️ Refrigerated Freight',
      cargoType_reefer_desc: 'Food, pharmaceuticals, perishables',
      cargoType_both: '📦 Both Cargo Types',
      cargoType_both_desc: 'I need both options',
      message: 'Message',
      privacy: 'I accept the privacy policy',
      submit: 'Send Message',
      success: 'Message sent successfully',
      error: 'Error sending. Please try again.',
    },
    // Clients
    clients: {
      title: 'Our Clients',
    },
    // Footer
    footer: {
      company: 'PREMIUM EXPRESS',
      rights: 'All rights reserved',
      dispatch_phone: 'Dispatch',
      dispatch_desc: 'Coordinate your shipments',
      dispatch_24: 'DISPATCH 24/7',
      dispatch_anytime: 'Coordinate your shipments anytime',
      about: 'Over 15 years moving freight across the United States with reliable dry and refrigerated transportation solutions.',
      operating: 'Operating 24/7 · 48 states',
      services: 'Services',
      dry: 'Dry Freight',
      reefer: 'Refrigerated Freight',
      coverage: 'National Coverage',
      fleet: 'Own Fleet',
      contact_header: 'Contact',
      sales: 'Sales',
      planing: 'Planning',
    },
    // Driver Application
    driver: {
      title: 'Apply as a Driver',
      description: 'Complete the driver competency form and we will contact you soon.',
      badge: 'Job Opportunities',
      // Contact Info
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone (US Cell)',
      emergencyContact: 'Emergency Contact Phone',
      emergencyContactName: 'Emergency Contact Name',
      // Personal Info
      primaryLanguage: 'Primary Language',
      languagePercentage: 'If not English, what percentage do you speak this language?',
      yearsExperience: 'Years of Experience',
      // Legal Status
      legalStatus: 'Legal Status',
      legalStatus_resident: 'Resident Citizen',
      legalStatus_permanent: 'Permanent Resident',
      legalStatus_permit: 'Work Permit',
      legalStatus_other: 'Other',
      license: 'License',
      license_mx: 'Mexico CDL',
      license_us: 'USA CDL',
      license_both: 'Both Licenses',
      cleanRecord: 'Do you have a clean record?',
      // Shift Preferences
      shiftPreference: 'Preferred Shift',
      shift_day: 'Day Shift',
      shift_night: 'Night Shift',
      shift_both: 'Both Shifts',
      nightShiftIssue: 'If you prefer day shift, is there any issue if night shift is required?',
      // Driving Experience
      milesPerDay: 'How many miles do you drive per day?',
      otrDays: 'What is the maximum number of days you can be OTR?',
      transmission: 'Transmission You Drive',
      transmission_auto: 'Automatic',
      transmission_manual: 'Manual',
      transmission_both: 'Both',
      reeferExperience: 'Have you used a reefer trailer?',
      // Accidents & Incidents
      roadAccidents: 'Have you had any road accidents?',
      allStates: 'Have you driven in all states?',
      statesNotDrive: 'Which states you don\'t drive in:',
      // Equipment & Tech
      elogbook: 'What electronic logbook have you used?',
      dotInspection: 'Do you know how to have a DOT inspection?',
      blackIce: 'Have you driven on black ice?',
      geotab: 'Have you used Geotab App?',
      tireChains: 'Have you used tire chains?',
      storms: 'Have you driven in storms?',
      tireChainSkill: 'Do you know how to put tire chains?',
      roadRepairs: 'Are you able to do road repairs on truck and trailer? Mention them:',
      // Consent
      privacy: 'I accept the privacy policy and application terms',
      submit: 'Submit Application',
      success: 'Application submitted successfully',
      error: 'Error sending. Please try again.',
      toggleQuote: 'Request Quote',
      toggleDriver: 'Apply as Driver',
    },
    // Chatbot
    chatbot: {
      title: 'Chat with us',
      placeholder: 'Ask me anything...',
      send: 'Send',
      close: 'Close',
      loading: 'Loading response...',
      error: 'Error sending message',
      help: 'How can I help you?',
    },
  },
}

export function getTranslation(locale: Locale, key: string) {
  const keys = key.split('.')
  let current: any = translations[locale]
  for (const k of keys) {
    current = current?.[k]
  }
  return current || key
}
