import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { HowWeWork } from "@/components/how-we-work"
import { Testimonials } from "@/components/testimonials"
import { Founder } from "@/components/founder"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { FloatingCta } from "@/components/floating-cta"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <HowWeWork />
      <Testimonials />
      <Founder />
      <Contact />
      <Footer />
      <FloatingCta />
    </main>
  )
}
