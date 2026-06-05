import type { LucideIcon } from "lucide-react"
import {
  Building2,
  CircleDollarSign,
  ClipboardCheck,
  Database,
  FolderLock,
  Globe2,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  Settings,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react"

import {
  getFundingUse,
  getNextActions,
  getPitchBlocks,
  getReadinessChecklist,
  getStartupContacts,
  getStartupDocuments,
  getStartupMessages,
  getStartupMetrics,
  getStartupMilestones,
  getStartupNotifications,
  getStartupProfile,
  getTeamMembers,
  type StartupDocument,
  type StartupMetric as StartupMetricData,
} from "@/lib/startup-service"

export type StartupMetric = StartupMetricData & {
  icon: LucideIcon
}

export const startupNavigation = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/startup/dashboard" },
  { label: "Perfil", icon: Building2, href: "/startup/profile" },
  { label: "Pitch", icon: ClipboardCheck, href: "/startup/pitch" },
  { label: "Métricas", icon: TrendingUp, href: "/startup/metrics" },
  { label: "Captação", icon: CircleDollarSign, href: "/startup/funding" },
  { label: "Equipa", icon: UsersRound, href: "/startup/team" },
  { label: "Documentos", icon: FolderLock, href: "/startup/documents" },
  { label: "Checklist", icon: ShieldCheck, href: "/startup/checklist" },
  { label: "Definições", icon: Settings, href: "/startup/settings" },
]

const contactIcons = {
  location: MapPin,
  website: Globe2,
  email: Mail,
  phone: Phone,
}

const metricIcons: Record<string, LucideIcon> = {
  "monthly-revenue": CircleDollarSign,
  "active-clients": UsersRound,
  "mom-growth": TrendingUp,
  runway: Database,
}

export const startupProfile = getStartupProfile()

export const startupContacts = getStartupContacts().map((contact) => ({
  ...contact,
  icon: contactIcons[contact.kind],
}))

export const startupMetrics: StartupMetric[] = getStartupMetrics().map(
  (metric) => ({
    ...metric,
    icon: metricIcons[metric.id] ?? Database,
  })
)

export const pitchBlocks = getPitchBlocks()
export const fundingUse = getFundingUse()
export const teamMembers = getTeamMembers()
export const startupDocuments: StartupDocument[] = getStartupDocuments()
export const readinessChecklist = getReadinessChecklist()
export const startupMilestones = getStartupMilestones()
export const nextActions = getNextActions()
export const startupMessages = getStartupMessages()
export const startupNotifications = getStartupNotifications()

export const statusTone: Record<StartupDocument["status"], string> = {
  Pronto:
    "bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)] border-[color:var(--seed-tint)]",
  "Em revisão":
    "bg-[color:var(--seed-cream)] text-[color:var(--seed-petroleum)] border-[color:var(--seed-gold-soft)]",
  "Em falta":
    "bg-red-50 text-red-700 border-red-100",
}
