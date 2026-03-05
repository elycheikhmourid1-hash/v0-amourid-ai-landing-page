import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { HowWeWork } from "@/components/how-we-work"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <HowWeWork />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
