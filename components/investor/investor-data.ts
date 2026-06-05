import type { LucideIcon } from "lucide-react"
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  ClipboardCheck,
  FolderOpen,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  ShieldCheck,
  Target,
  TrendingUp,
  UserRound,
} from "lucide-react"

import {
  getInvestorDataRooms,
  getInvestorDiligenceTasks,
  getInvestorMessages,
  getInvestorMetrics,
  getInvestorNotifications,
  getInvestorOpportunities,
  getInvestorPipeline,
  getInvestorProfile,
  type InvestorDiligenceTask,
  type InvestorMetric as InvestorMetricData,
  type InvestorOpportunity,
} from "@/lib/investor-service"

export type InvestorMetric = InvestorMetricData & {
  icon: LucideIcon
}

export const investorNavigation = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/investor/dashboard" },
  { label: "Perfil", icon: UserRound, href: "/investor/profile" },
  { label: "Oportunidades", icon: Target, href: "/investor/opportunities" },
  { label: "Pipeline", icon: BriefcaseBusiness, href: "/investor/pipeline" },
  { label: "Due Diligence", icon: ShieldCheck, href: "/investor/diligence" },
  { label: "Data rooms", icon: FolderOpen, href: "/investor/data-rooms" },
  { label: "Mensagens", icon: MessageSquareText, href: "/investor/messages" },
  { label: "Notificações", icon: Bell, href: "/investor/notifications" },
  { label: "Definições", icon: Settings, href: "/investor/settings" },
]

const metricIcons: Record<string, LucideIcon> = {
  matched: Target,
  "active-dd": ShieldCheck,
  pipeline: CircleDollarSign,
  "data-rooms": FolderOpen,
}

export const investorProfile = getInvestorProfile()

export const investorMetrics: InvestorMetric[] = getInvestorMetrics().map(
  (metric) => ({
    ...metric,
    icon: metricIcons[metric.id] ?? TrendingUp,
  })
)

export const investorOpportunities = getInvestorOpportunities()
export const investorPipeline = getInvestorPipeline()
export const investorDiligenceTasks = getInvestorDiligenceTasks()
export const investorDataRooms = getInvestorDataRooms()
export const investorMessages = getInvestorMessages()
export const investorNotifications = getInvestorNotifications()

export const opportunityStatusTone: Record<InvestorOpportunity["status"], string> = {
  Nova:
    "bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)] border-[color:var(--seed-tint)]",
  "Em análise":
    "bg-[color:var(--seed-cream)] text-[color:var(--seed-petroleum)] border-[color:var(--seed-gold-soft)]",
  "Due diligence":
    "bg-[color:var(--seed-petroleum)] text-[color:var(--seed-cream)] border-[color:var(--seed-petroleum)]",
  "Term sheet": "bg-emerald-100 text-emerald-800 border-emerald-100",
}

export const diligenceStatusTone: Record<InvestorDiligenceTask["status"], string> = {
  Pendente: "bg-red-50 text-red-700 border-red-100",
  "Em revisão":
    "bg-[color:var(--seed-cream)] text-[color:var(--seed-petroleum)] border-[color:var(--seed-gold-soft)]",
  Completo:
    "bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)] border-[color:var(--seed-tint)]",
}

export const contactIcons = {
  location: Building2,
  mandate: ClipboardCheck,
  ticket: CircleDollarSign,
  thesis: Target,
}
