import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { HowWeWork } from "@/components/how-we-work"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { FloatingCta } from "@/components/floating-cta"

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <HowWeWork />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  )
}
