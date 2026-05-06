import { HeroSection } from './components/sections/HeroSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { NosotrosSection } from './components/sections/NosotrosSection'
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
        <NosotrosSection />
        <ContactDirectSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
