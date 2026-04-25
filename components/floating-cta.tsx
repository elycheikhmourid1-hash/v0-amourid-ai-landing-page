"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { LeadFormDialog } from "@/components/lead-form-dialog"

export function FloatingCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <LeadFormDialog>
        <Button
          size="lg"
          className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25 px-6 text-sm font-semibold gap-2"
          aria-label="Request free automation consultation"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Try Free Automation Now</span>
          <span className="sm:hidden">Free Consultation</span>
        </Button>
      </LeadFormDialog>
    </div>
  )
}
