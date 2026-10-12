import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ROBOTICS_2D_URL, ROBOTICS_3D_URL } from "@/components/robotics-ops"

export const metadata: Metadata = {
  title: "Products | AICore Digital",
  description:
    "AICore Digital is a software product company. Robotics Ops, Mawid, Marchés Monitor, Tadqiq, and Smart Contact. The system flags and drafts; a human always decides, with an audit log.",
}

type ProductStatus = "Demo" | "Early stage"

type ProductLink = {
  href: string
  label: string
  external?: boolean
}

type Product = {
  name: string
  description: string
  status: ProductStatus
  links: ProductLink[]
}

const products: Product[] = [
  {
    name: "AICore Robotics Ops",
    description: "Human-supervised robot operations console for telecom and satellite stations.",
    status: "Demo",
    links: [
      { href: "/robotics", label: "View demo" },
      { href: ROBOTICS_2D_URL, label: "View demo · 2D", external: true },
      { href: ROBOTICS_3D_URL, label: "View demo · 3D", external: true },
    ],
  },
  {
    name: "Mawid",
    description: "Clinic appointment system.",
    status: "Early stage",
    links: [],
  },
  {
    name: "Marchés Monitor",
    description: "Procurement-notice monitor for marchespublics.gov.mr.",
    status: "Demo",
    links: [
      {
        href: "https://elycheikhmourid1-hash.github.io/marches/",
        label: "View demo",
        external: true,
      },
    ],
  },
  {
    name: "Tadqiq",
    description: "Supervised loan-file and KYC review.",
    status: "Demo",
    links: [
      {
        href: "https://elycheikhmourid1-hash.github.io/tadqiq/",
        label: "View demo",
        external: true,
      },
    ],
  },
  {
    name: "Smart Contact",
    description: "Lead intake with human review.",
    status: "Demo",
    links: [{ href: "/contact", label: "View demo" }],
  },
]

function StatusBadge({ status }: { status: ProductStatus }) {
  const demo = status === "Demo"
  return (
    <span
      className={
        demo
          ? "inline-flex shrink-0 items-center rounded-full border border-cyan-400/60 bg-cyan-400/10 px-3 py-1 text-xs font-bold tracking-wide text-cyan-200"
          : "inline-flex shrink-0 items-center rounded-full border border-amber-400/70 bg-amber-400/15 px-3 py-1 text-xs font-bold tracking-wide text-amber-200"
      }
    >
      {status}
    </span>
  )
}

function ProductLinkItem({ link }: { link: ProductLink }) {
  const className =
    "text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary"
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
      </a>
    )
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  )
}

export default function ProductsPage() {
  return (
    <main>
      <Navbar />
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Products</p>
            <h1 className="text-pretty font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl shimmer">
              Software products
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              AICore Digital is a software product company. Each product below is a tool an operator can open, review, and decide on.
            </p>
          </div>

          <p className="mb-12 rounded-2xl glass px-6 py-4 text-sm font-medium leading-relaxed text-foreground sm:text-base">
            The system flags and drafts; a human always decides, with an audit log.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.name} className="flex h-full flex-col rounded-2xl glass p-8">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h2 className="font-mono text-xl font-bold text-foreground">{product.name}</h2>
                  <StatusBadge status={product.status} />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                {product.links.length > 0 && (
                  <div className="mt-6 flex flex-col items-start gap-2">
                    {product.links.map((link) => (
                      <ProductLinkItem key={link.href} link={link} />
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
