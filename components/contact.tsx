import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, Mail, MapPin, Phone, Linkedin, CheckCircle2, Loader2 } from "lucide-react"

fonction export Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [chargement, setLoading] = useState(false)
  const [erreur, setErreur] = useState("")

fonction asynchrone handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.prévenirDefault()
    définirChargement(vrai)
    définirErreur("")

    const formData = nouveau FormData (e.currentTarget)
    const data = Object.fromEntries(formData)

essayer {
      const res = await fetch("/api/contact", {
        méthode: « POST »,
        en- têtes : { "Content-Type": "application/json" },
        corps : JSON.stringify(données),
})

    if (!res.ok) throw new Error("Échec de l'envoi")
    setSubmitted(true)
  } attraper(erreur) {
    setError("Veuillez nous contacter directement par e-mail à l' adresse contact@aicoredigital.com pendant que nous mettons à jour notre système.")
  } enfin {
    définirChargement(false)
  }
}

retour(
  <section id="contact" className="px-6 py-24 bg-background">
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-16 lg:grid-cols-2">
        {/* Informations commerciales */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Contactez-nous</p>
          <h2 className="text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-mono">
            Prêt à <span className="text-primary">automatiser</span> ?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Réservez votre séance stratégique gratuite en IA et découvrez comment nous pouvons optimiser vos opérations.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            <a href="mailto: contact@aicoredigital.com" className="flex items-center gap-4 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium"> contact@aicoredigital.com </p>
            </a>
            <a href="tel:+18044853384" className="flex items-center gap-4 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">+1 (804) 485-3384</p>
            </a>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Richmond, Virginie, États-Unis</p>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          {soumis ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center py-12">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Demande de stratégie envoyée !</h3>
              Nous vous contacterons dans les 24 heures.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="first-name">Prénom</Label>
                  <Input id="first-name" name="firstName" placeholder="Votre nom" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="last-name">Nom de famille</Label>
                  <Input id="last-name" name="lastName" placeholder="Nom de famille" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Courriel professionnel</Label>
                <Input id="email" name="email" type="email" placeholder=" nom@entreprise.com " requis />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Comment pouvons-nous vous aider ?</Label>
                <Textarea id="message" name="message" placeholder="Décrivez vos besoins..." rows={4} required />
              </div>
              {erreur && <p className="text-sm text-destructive font-medium">{erreur}</p>}
              <Button type="submit" size="lg" disabled={loading} className="mt-2 rounded-xl">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Obtenez gratuitement la feuille de route de l'IA"}
              </Bouton>
            </form>
          )}
        </div>
      </div>
    </div>
  </section>
)
}