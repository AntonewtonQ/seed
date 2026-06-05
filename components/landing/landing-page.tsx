import { AudienceSection } from "./audience-section"
import { LandingCta } from "./landing-cta"
import { LandingFooter } from "./landing-footer"
import { LandingHeader } from "./landing-header"
import { LandingHero } from "./landing-hero"
import { ModulesSection } from "./modules-section"
import { PlatformPreview } from "./platform-preview"
import { ProcessSection } from "./process-section"
import { SecuritySection } from "./security-section"
import { TrustStrip } from "./trust-strip"

export function LandingPage() {
  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-background text-foreground">
        <LandingHero />
        <TrustStrip />
        <AudienceSection />
        <PlatformPreview />
        <ModulesSection />
        <ProcessSection />
        <SecuritySection />
        <LandingCta />
      </main>
      <LandingFooter />
    </>
  )
}
