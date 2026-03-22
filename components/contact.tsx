"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2 } from "lucide-react"

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<
    HTMLFormElement>) {

    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (res.ok) setSubmitted(true)
    setLoading(false)
  }

  return (
    <section id="contact" className="py-24 px-6 bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 font-mono">Start Your AI Transformation</h2>
        {submitted ? (
          <div className="bg-primary/20 p-8 rounded-xl border border-primary">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold">Message Received!</h3>
            <p className="text-slate-400 mt-2">Our team will reach out within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-6 text-left bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" className="bg-slate-800 border-slate-700" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" className="bg-slate-800 border-slate-700" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Business Email</Label>
              <Input id="email" name="email" type="email" className="bg-slate-800 border-slate-700" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">How can we help?</Label>
              <Textarea id="message" name="message" rows={4} className="bg-slate-800 border-slate-700" required />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl transition-all">
              {loading ? <Loader2 className="animate-spin mr-2" /> : "Request Free Consultation"}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
