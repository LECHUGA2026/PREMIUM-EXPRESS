# 🚀 Configuración de Nuevas Características

## Resumen de Cambios

Has recibido las siguientes actualizaciones en tu sitio web:

### 1. **Soporte Multi-Idioma (Español/Inglés)** 🌍
- Nuevo sistema de internacionalización completo
- Botón de cambio de idioma en la esquina superior derecha
- Almacenamiento en localStorage para persistencia
- Todas las secciones con traducciones

**Ubicación:** `lib/i18n.ts`

### 2. **Chatbot con IA Gemini Gratuita** 🤖
- Chatbot flotante con IA potenciada por Google Gemini
- Soporte para conversaciones en español e inglés
- Libre y fácil de configurar
- Disponible 24/7 en la esquina inferior derecha

**Componentes:**
- `app/components/Chatbot.tsx` - Interfaz del chatbot
- `app/api/chatbot/route.ts` - Backend API

### 3. **Carrusel de Clientes** ⭐
- Sección nueva con carrusel automático de clientes
- Navegación manual con botones
- Indicadores de página
- Ubicado entre Servicios y Contacto Directo

**Ubicación:** `app/components/sections/ClientsCarousel.tsx`

### 4. **Mejoras en el Footer** 📞
- Sección destacada de Dispatch 24/7 en la parte superior
- Teléfono de dispatch prominente con botón de llamada
- Mejor organización de contactos

### 5. **Teléfono de Ventas en el Formulario** ☎️
- Tarjeta informativa junto al formulario de contacto
- Llamada directa a ventas
- Horarios de operación mostrados

### 6. **Iconos de Camiones Mejorados** 🚛
- Reemplazados los iconos simples con ilustraciones SVG de camiones
- 3 variantes: Carga Seca, Refrigerada, Cobertura Nacional
- Mejor impacto visual

---

## 📝 Configuración Requerida

### 1. **API Key de Gemini (Obligatorio para Chatbot)**

1. Ve a [Google AI Studio](https://ai.google.dev/aistudio)
2. Haz clic en "Get API Key"
3. Crear una nueva API key gratuita (sin necesidad de tarjeta de crédito)
4. Copia la clave

En tu archivo `.env.local`:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=tu_clave_aqui
```

O en `.env.local` (si prefieres mantenerla privada en el servidor):

```bash
GEMINI_API_KEY=tu_clave_aqui
```

### 2. **Configuración de Email (Opcional - Para envío real de cotizaciones)**

#### Opción A: Gmail SMTP

```bash
GMAIL_USER=tu_email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
CONTACT_EMAIL=ventas@tuempresa.com
```

[Tutorial: Cómo obtener App Password en Gmail](https://myaccount.google.com/apppasswords)

#### Opción B: Resend (Recomendado)

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=ventas@tuempresa.com
```

[Obtener API Key en Resend](https://resend.com)

### 3. **Personalizar Clientes del Carrusel**

Edita `app/components/sections/ClientsCarousel.tsx`:

```typescript
const clients = [
  { id: 1, name: 'Cliente 1', logo: '🏢' }, // Reemplaza logo con URL de imagen
  { id: 2, name: 'Cliente 2', logo: '🏪' },
  // ... más clientes
]
```

Para usar imágenes reales:

```typescript
const clients = [
  { id: 1, name: 'Acme Corp', logo: '/images/clients/acme.png' },
  // ...
]
```

### 4. **Actualizar Números de Teléfono**

- **Footer:** `app/components/layout/Footer.tsx` (línea ~20)
- **Contacto Directo:** `app/components/sections/ContactDirectSection.tsx`
- **Formulario:** `app/components/sections/ContactForm.tsx` (línea ~280)

---

## 🎨 Personalización

### Cambiar Colores
Edita `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      brand: {
        orange: '#F97316',      // Color primario
        'orange-dark': '#EA6C0A',
        navy: '#0A1628',        // Color oscuro
        blue: '#1B3A6B',
        // ...
      },
    },
  },
}
```

### Cambiar Textos de Traducciones
Edita `lib/i18n.ts`:

```typescript
export const translations = {
  es: {
    hero: {
      headline1: 'Tu texto aquí',
      // ...
    },
  },
  en: {
    hero: {
      headline1: 'Your text here',
      // ...
    },
  },
}
```

---

## 🧪 Pruebas

### Ejecutar en Desarrollo

```bash
npm install  # Si es la primera vez
npm run dev
```

Abre http://localhost:3000

### Probar Características

1. **Chatbot:** Haz clic en el ícono naranja en la esquina inferior derecha
2. **Idiomas:** Usa el botón de idioma en la esquina superior derecha
3. **Carrusel:** Navega con los botones o los puntos indicadores
4. **Teléfono:** Haz clic en cualquier número para llamar (en móvil)

---

## 📦 Deploying a Producción

### Variables de Entorno Necesarias

Antes de deployar, asegúrate de tener configuradas:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=xxxxx
NEXT_PUBLIC_SITE_URL=https://tudominio.com
CONTACT_EMAIL=ventas@tudominio.com
# Si usas Resend:
RESEND_API_KEY=xxxxx
# O si usas Gmail:
GMAIL_USER=xxxxx
GMAIL_APP_PASSWORD=xxxxx
```

### En Vercel

1. Ve a Project Settings > Environment Variables
2. Agrega todas las variables de arriba
3. Deploy automáticamente desde Git

### En Otro Hosting

1. Copia los archivos con `npm run build`
2. Deploy con `npm start`
3. Configura las variables de entorno en tu plataforma

---

## ❓ FAQ

**P: ¿El chatbot cuesta dinero?**
R: No, Gemini API es gratis con límites razonables. Puedes usar hasta 60 solicitudes por minuto sin pagar.

**P: ¿Cómo cambio los clientes del carrusel?**
R: Edita la variable `clients` en `app/components/sections/ClientsCarousel.tsx`

**P: ¿Dónde edito los números de teléfono?**
R: Busca `+15551234567` en los componentes y reemplázalo. Hay 3 números principales en:
- Footer (Dispatch)
- Contacto Directo (Ventas)
- Formulario de Contacto (Ventas)

**P: ¿Puedo agregar más idiomas?**
R: Sí, edita `lib/i18n.ts` y agrega tus idiomas al objeto `translations`

**P: ¿El chatbot funciona sin API Key?**
R: Sí, pero mostrará un mensaje de error. Es recomendado configurarla.

---

## 🆘 Soporte

Si encuentras problemas:

1. Verifica que `.env.local` esté configurado correctamente
2. Recarga la página (Ctrl+F5 / Cmd+Shift+R)
3. Abre la consola del navegador (F12) para ver errores
4. Revisa los logs del servidor: `npm run dev`

---

## 📂 Archivos Nuevos/Modificados

### ✨ Nuevos
- `lib/i18n.ts` - Configuración de idiomas
- `app/components/Chatbot.tsx` - Componente del chatbot
- `app/components/LanguageSwitcher.tsx` - Botón de cambio de idioma
- `app/components/sections/ClientsCarousel.tsx` - Carrusel de clientes
- `app/api/chatbot/route.ts` - API del chatbot

### 🔄 Modificados
- `app/layout.tsx` - Agregado chatbot y soporte i18n
- `app/page.tsx` - Agregado carrusel de clientes
- `app/components/layout/Footer.tsx` - Sección de dispatch destacada
- `app/components/sections/ContactForm.tsx` - Teléfono de ventas
- `app/components/sections/ServicesSection.tsx` - Iconos de camiones SVG
- `.env.example` - Nuevas variables de configuración

---

**¡Listo! Tu sitio web está actualizado con todas las nuevas características. 🎉**
