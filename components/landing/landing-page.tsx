import { AudienceSection } from "./audience-section"
import { LandingFooter } from "./landing-footer"
import { LandingHeader } from "./landing-header"
import { LandingHero } from "./landing-hero"
import { ProcessSection } from "./process-section"
import { SecuritySection } from "./security-section"

export function LandingPage() {
  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-background text-foreground">
        <LandingHero />
        <AudienceSection />
        <ProcessSection />
        <SecuritySection />
      </main>
      <LandingFooter />
    </>
  )
}
