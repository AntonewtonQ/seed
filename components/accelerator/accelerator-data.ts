import type { LucideIcon } from "lucide-react"
import {
  Bell,
  BookOpenCheck,
  Building2,
  ClipboardCheck,
  FolderOpen,
  LayoutDashboard,
  MessageSquareText,
  Rocket,
  Settings,
  ShieldCheck,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react"

import {
  getAcceleratedStartups,
  getAcceleratorDataRooms,
  getAcceleratorDiligenceTasks,
  getAcceleratorMessages,
  getAcceleratorMetrics,
  getAcceleratorNotifications,
  getAcceleratorPipeline,
  getAcceleratorProfile,
  getAcceleratorPrograms,
  type AcceleratedStartup,
  type AcceleratorDataRoom,
  type AcceleratorDiligenceTask,
  type AcceleratorMetric as AcceleratorMetricData,
  type AcceleratorProgram,
} from "@/lib/accelerator-service"

export type AcceleratorMetric = AcceleratorMetricData & {
  icon: LucideIcon
}

export const acceleratorNavigation = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/accelerator/dashboard" },
  { label: "Perfil", icon: Building2, href: "/accelerator/profile" },
  { label: "Startups", icon: UsersRound, href: "/accelerator/startups" },
  { label: "Programas", icon: BookOpenCheck, href: "/accelerator/programs" },
  { label: "Pipeline", icon: Rocket, href: "/accelerator/pipeline" },
  { label: "Due Diligence", icon: ShieldCheck, href: "/accelerator/diligence" },
  { label: "Data rooms", icon: FolderOpen, href: "/accelerator/data-rooms" },
  { label: "Mensagens", icon: MessageSquareText, href: "/accelerator/messages" },
  { label: "Notificações", icon: Bell, href: "/accelerator/notifications" },
  { label: "Definições", icon: Settings, href: "/accelerator/settings" },
]

const metricIcons: Record<string, LucideIcon> = {
  portfolio: UsersRound,
  "investor-ready": Rocket,
  "data-rooms": FolderOpen,
  diligence: ShieldCheck,
}

export const acceleratorProfile = getAcceleratorProfile()

export const acceleratorMetrics: AcceleratorMetric[] =
  getAcceleratorMetrics().map((metric) => ({
    ...metric,
    icon: metricIcons[metric.id] ?? TrendingUp,
  }))

export const acceleratedStartups = getAcceleratedStartups()
export const acceleratorPrograms = getAcceleratorPrograms()
export const acceleratorPipeline = getAcceleratorPipeline()
export const acceleratorDiligenceTasks = getAcceleratorDiligenceTasks()
export const acceleratorDataRooms = getAcceleratorDataRooms()
export const acceleratorMessages = getAcceleratorMessages()
export const acceleratorNotifications = getAcceleratorNotifications()

export const startupStatusTone: Record<AcceleratedStartup["status"], string> = {
  "Em preparação":
    "bg-[color:var(--seed-cream)] text-[color:var(--seed-petroleum)] border-[color:var(--seed-gold-soft)]",
  "Pronta para investidores":
    "bg-emerald-100 text-emerald-800 border-emerald-100",
  "Em due diligence":
    "bg-[color:var(--seed-petroleum)] text-[color:var(--seed-cream)] border-[color:var(--seed-petroleum)]",
  Bloqueada: "bg-red-50 text-red-700 border-red-100",
}

export const programStatusTone: Record<AcceleratorProgram["status"], string> = {
  Ativo:
    "bg-[color:var(--seed-petroleum)] text-[color:var(--seed-cream)] border-[color:var(--seed-petroleum)]",
  Planeado:
    "bg-[color:var(--seed-cream)] text-[color:var(--seed-petroleum)] border-[color:var(--seed-gold-soft)]",
  Encerrado:
    "bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)] border-[color:var(--seed-tint)]",
}

export const diligenceStatusTone: Record<AcceleratorDiligenceTask["status"], string> = {
  Pendente: "bg-red-50 text-red-700 border-red-100",
  "Em revisão":
    "bg-[color:var(--seed-cream)] text-[color:var(--seed-petroleum)] border-[color:var(--seed-gold-soft)]",
  Completo:
    "bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)] border-[color:var(--seed-tint)]",
}

export const dataRoomStatusTone: Record<AcceleratorDataRoom["status"], string> = {
  Completo:
    "bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)] border-[color:var(--seed-tint)]",
  "Em revisão":
    "bg-[color:var(--seed-cream)] text-[color:var(--seed-petroleum)] border-[color:var(--seed-gold-soft)]",
  "Com bloqueios": "bg-red-50 text-red-700 border-red-100",
}

export const acceleratorFocusIcon = Target
export const acceleratorProgramIcon = ClipboardCheck
