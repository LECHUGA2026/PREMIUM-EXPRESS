import type { Metadata } from 'next';
// @ts-ignore: global CSS import handled by Next.js
import './globals.css';
import { Providers } from './Providers';

export const metadata: Metadata = {
  title: 'Premium Express | Transporte de Carga en Estados Unidos',
  description:
    'Premium Express ofrece transporte de carga seca y refrigerada en los 48 estados contiguos de Estados Unidos con servicio confiable y atención rápida.',
  keywords: [
    'Premium Express',
    'transporte de carga',
    'logística',
    'carga seca',
    'carga refrigerada',
    'Estados Unidos',
    'freight',
    'logistics',
  ],
  openGraph: {
    title: 'Premium Express | Transporte de Carga en Estados Unidos',
    description:
      'Soluciones de transporte de carga seca y refrigerada en los 48 estados contiguos. Cotiza hoy.',
    type: 'website',
    locale: 'es_MX',
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Barlow+Condensed:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}