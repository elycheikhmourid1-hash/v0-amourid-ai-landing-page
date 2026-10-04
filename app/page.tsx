import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FounderMessage } from "@/components/founder-message"
import { AutomationSimulator } from "@/components/automation-simulator"
import { AgentPlayground } from "@/components/agent-playground"
import { IndustrySimulator } from "@/components/industry-simulator"
import { Services } from "@/components/services"
import { RoboticsOps } from "@/components/robotics-ops"
import { HowWeWork } from "@/components/how-we-work"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { FloatingCta } from "@/components/floating-cta"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FounderMessage />
      <AutomationSimulator />
      <AgentPlayground />
      <IndustrySimulator />
      <Services />
      <RoboticsOps />
      <HowWeWork />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingCta />
    </main>
  )
}
