import { PlatformNavigation } from "@/components/platform/platform-navigation"

import { startupNavigation } from "./startup-data"

export function StartupNavigation() {
  return (
    <PlatformNavigation items={startupNavigation} label="Área da startup" />
  )
}
