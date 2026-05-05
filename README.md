# Premium Express — Sitio Web Corporativo

Sitio web moderno para empresa de logística y transporte, construido con **Next.js 15**, **TypeScript**, **Tailwind CSS** y **React Hook Form**.

---

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea o edita el archivo `.env.local` en la raíz del proyecto con tu clave y credenciales de envío de correo.

Edita `.env.local` y agrega tus variables de entorno cuando estés listo.

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del Proyecto

```
premium-express/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Navegación responsive
│   │   │   └── Footer.tsx          # Pie de página completo
│   │   └── sections/
│   │       ├── HeroSection.tsx     # Sección principal con CTA
│   │       ├── ServicesSection.tsx # Grid de servicios
│   │       ├── ContactDirectSection.tsx # Teléfonos directos
│   │       └── ContactForm.tsx     # Formulario con validación
│   ├── globals.css                 # Estilos globales + fuentes
│   ├── layout.tsx                  # Layout raíz con metadata
│   └── page.tsx                    # Página principal
├── lib/
│   ├── actions.ts                  # Server Action + Resend
│   └── utils.ts                    # Funciones utilitarias
├── types/
│   └── index.ts                    # Tipos TypeScript
├── .env.example                    # Variables de entorno ejemplo
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## ✉️ Activar Envío de Emails (Resend)

En `lib/actions.ts`, busca el bloque comentado y descoméntalo:

```typescript
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

const { data: emailData, error } = await resend.emails.send(emailPayload)
if (error) throw new Error(error.message)
```

Y en `.env.local`:
```
RESEND_API_KEY=re_tu_api_key_aqui
CONTACT_EMAIL=ventas@tudominio.com
```

---

## 🔒 Seguridad del Formulario

- **Honeypot field**: Campo oculto que detecta bots automáticamente
- **Rate limiting**: Máximo 3 envíos por minuto por IP (en memoria)
- **Validación dual**: Zod en cliente (react-hook-form) Y en servidor
- **Tipos estrictos**: TypeScript strict mode en todo el proyecto

---

## 🎨 Tecnologías

| Tecnología | Uso |
|---|---|
| Next.js 15 | Framework con App Router |
| TypeScript | Tipado estricto |
| Tailwind CSS | Estilos utility-first |
| React Hook Form | Manejo de formularios |
| Zod | Validación de esquemas |
| Resend | Envío de emails transaccionales |
| Sonner | Toast notifications |
| Lucide React | Iconografía |

---

## 📱 Características

- ✅ Totalmente responsive (mobile-first)
- ✅ SEO optimizado con metadata completa
- ✅ Accesibilidad (WCAG 2.1 AA)
- ✅ Animaciones CSS suaves
- ✅ Formulario con validación en tiempo real
- ✅ Teléfonos clickeables en móvil (`tel:`)
- ✅ Server Actions para el formulario
- ✅ Navbar con scroll detection y menú hamburguesa

---

© 2024 Premium Express. Todos los derechos reservados.
