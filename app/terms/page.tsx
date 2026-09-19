import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <main>
      <Navbar />
      <article className="mx-auto max-w-3xl px-6 py-28">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Legal</p>
        <h1 className="text-3xl font-bold tracking-tight">Terms of Use</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: September 19, 2026</p>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          This website is operated by AICore Digital LLC, Richmond, Virginia. Information on the site is general and does not create a contract, a government mandate, or a professional legal opinion.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Engagements</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Paid work starts only with a written statement of work. The client remains responsible for decisions. We do not issue automated administrative or judicial acts.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Intellectual property</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Client data remains the client’s. Tools we build for a client are governed by the statement of work.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Limitation</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          To the extent permitted by Virginia law, we are not liable for indirect or consequential damages arising from use of this public website.
        </p>
        <p className="mt-10 text-sm">
          <Link href="/" className="underline underline-offset-4">Back to home</Link>
        </p>
      </article>
      <Footer />
    </main>
  )
}
