import type { Metadata } from "next"

import { StartupPitchWizardPage } from "@/components/startup/startup-pitch-wizard-page"

export const metadata: Metadata = {
  title: "Wizard de pitch | SEED",
  description: "Construa a narrativa de investimento da startup por blocos.",
}

export default function StartupPitchWizardRoute() {
  return <StartupPitchWizardPage />
}
