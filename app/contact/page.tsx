import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmartContact } from "@/components/smart-contact"

export const metadata: Metadata = {
  title: "Contact | AICore Digital",
  description:
    "A human reads every request. Tell AICore Digital what you need. We reply as soon as we can.",
}

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <SmartContact />
      <Footer />
    </main>
  )
}
