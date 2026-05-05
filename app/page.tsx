import { HeroSection } from './components/sections/HeroSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { LoadsSection } from './components/sections/LoadsSection'
import { ContactDirectSection } from './components/sections/ContactDirectSection'
import { ContactForm } from './components/sections/ContactForm'
import { ClientOnlyElements } from './components/ClientOnlyElements'
import { Footer } from './components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <ClientOnlyElements />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <LoadsSection />
        <ContactDirectSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
