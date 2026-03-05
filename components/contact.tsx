"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, Mail, MapPin, Phone, Linkedin, CheckCircle2 } from "lucide-react"

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left side */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              Get in Touch
            </p>
            <h2 className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-mono">
              Ready to automate your business?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Book a free consultation and discover how AI automation can save
              you time, reduce errors, and grow your bottom line.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <a
                href="mailto:elycheikhmourid1@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-accent/10">
                  <Mail className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    elycheikhmourid1@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+18044853384"
                className="flex items-center gap-4 group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-accent/10">
                  <Phone className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    (804) 485-3384
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <MapPin className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">
                    Richmond, VA, USA
                  </p>
                </div>
              </div>

              <a
                href="https://www.linkedin.com/in/ely-cheikh-mourid-7150b12b2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-accent/10">
                  <Linkedin className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">LinkedIn</p>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Ely Cheikh Mourid
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right side — form */}
          <div className="rounded-2xl border border-border bg-card p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center py-12">
                <CheckCircle2 className="h-12 w-12 text-accent" />
                <h3 className="text-xl font-bold text-foreground font-mono">
                  Thank you!
                </h3>
                <p className="text-muted-foreground">
                  {"We'll be in touch within 24 hours to schedule your free consultation."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      placeholder="John"
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      required
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    className="rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    className="rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">
                    How can we help?
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your automation needs..."
                    rows={4}
                    required
                    className="rounded-lg resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="mt-2 rounded-full text-base">
                  Request Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
