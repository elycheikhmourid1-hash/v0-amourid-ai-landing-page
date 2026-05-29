"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react"

interface LeadFormDialogProps {
  children: React.ReactNode
}

export function LeadFormDialog({ children }: LeadFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("lead-name") as string,
      email: formData.get("lead-email") as string,
      phone: formData.get("lead-phone") as string,
      automationNeeds: formData.get("lead-message") as string,
      trap: formData.get("_trap") as string,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.name,
          email: data.email,
          phone: data.phone,
          message: data.automationNeeds,
          source: "lead-form",
          _trap: data.trap,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error || "Failed to send. Please try again.")
        return
      }

      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleOpenChange(value: boolean) {
    setOpen(value)
    if (!value) {
      setTimeout(() => {
        setSubmitted(false)
        setError("")
      }, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md border-border bg-card">
        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle2 className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground font-mono">
              Thank you!
            </h3>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              {"We'll contact you within 24 hours."}
            </p>
            <Button
              onClick={() => handleOpenChange(false)}
              variant="outline"
              className="mt-2 rounded-full"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="mb-1 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                  <Sparkles className="h-4 w-4 text-accent" />
                </div>
                <DialogTitle className="text-lg font-bold text-foreground font-mono">
                  Free Automation Consultation
                </DialogTitle>
              </div>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                Tell us what you want to automate and we will build a custom solution for you — no commitment required.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4">
              <input type="text" name="_trap" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
              <div className="flex flex-col gap-2">
                <Label htmlFor="lead-name" className="text-sm font-medium text-foreground">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lead-name"
                  name="lead-name"
                  placeholder="Your full name"
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="lead-email" className="text-sm font-medium text-foreground">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lead-email"
                  name="lead-email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="lead-phone" className="text-sm font-medium text-foreground">
                  Phone <span className="text-xs text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Input
                  id="lead-phone"
                  name="lead-phone"
                  type="tel"
                  placeholder="(804) 000-0000"
                  className="rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="lead-message" className="text-sm font-medium text-foreground">
                  What do you want to automate? <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="lead-message"
                  name="lead-message"
                  placeholder="e.g. I need to automate Google Forms responses and send custom emails to each submission..."
                  rows={3}
                  required
                  className="rounded-lg resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="mt-1 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Request Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                No spam. No commitment. Just a conversation about your needs.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
