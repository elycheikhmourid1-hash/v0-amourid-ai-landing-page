import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />
      <article className="mx-auto max-w-3xl px-6 py-28">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Legal</p>
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: September 19, 2026</p>
        <p className="mt-6 text-sm text-muted-foreground">
          AICore Digital LLC is a Virginia limited liability company. Contact: elycheikh@aicoredigital.com · +1 (804) 485-3384 · Richmond, Virginia.
        </p>
        <h2 className="mt-10 text-xl font-semibold">What we collect</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Contact data you submit on this site. Technical data needed to operate and secure the site. Project data only under a written statement of work, processed as instructed by the client.
        </p>
        <h2 className="mt-8 text-xl font-semibold">What we do not do</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          We do not sell personal data. We do not use client project data to train foundation models.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Virginia Consumer Data Protection Act</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          If you are a Virginia consumer and the Act applies, you may request to confirm processing, access, correct, delete, or obtain a copy of personal data, and to opt out of targeted advertising, sale, or certain profiling. Send requests to elycheikh@aicoredigital.com. We respond within 45 days.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Institutional work</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          When a government or other institution is the controller, that institution’s law governs the file. We act as processor. Storage is the location named in the statement of work.
        </p>
        <p className="mt-10 text-sm">
          <Link href="/" className="underline underline-offset-4">Back to home</Link>
        </p>
      </article>
      <Footer />
    </main>
  )
}
