import type { LucideIcon } from "lucide-react"
import {
  Building2,
  CircleDollarSign,
  ClipboardCheck,
  Database,
  FileCheck,
  FolderLock,
  Handshake,
  LockKeyhole,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react"

export type LandingIconItem = {
  title: string
  text: string
  icon: LucideIcon
}

export const navLinks = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#plataforma", label: "Produto" },
  { href: "#processo", label: "Como funciona" },
  { href: "#seguranca", label: "Segurança" },
]

export const heroStats = [
  { value: "24", label: "startups preparadas" },
  { value: "36", label: "investidores qualificados" },
  { value: "18", label: "data rooms ativos" },
]

export const audienceCards: LandingIconItem[] = [
  {
    title: "Startups aceleradas",
    text: "Transformam métricas, documentos e narrativa de crescimento num perfil pronto para investimento.",
    icon: Building2,
  },
  {
    title: "Investidores",
    text: "Avaliam oportunidades qualificadas com dados comparáveis, acesso controlado e histórico de análise.",
    icon: CircleDollarSign,
  },
  {
    title: "Aceleradoras",
    text: "Acompanham a evolução das startups e reduzem fricção entre preparação, triagem e negociação.",
    icon: UsersRound,
  },
]

export const modules: LandingIconItem[] = [
  {
    title: "Investor Pipeline",
    text: "Organiza cada oportunidade desde a triagem até à negociação, com etapas, sinais e responsáveis.",
    icon: TrendingUp,
  },
  {
    title: "Data Room",
    text: "Centraliza documentos críticos por categoria, versão e nível de acesso para cada investidor.",
    icon: Database,
  },
  {
    title: "Due Diligence",
    text: "Estrutura a validação de identidade, equipa, finanças, tração, mercado e risco operacional.",
    icon: ShieldCheck,
  },
  {
    title: "Mensagens seguras",
    text: "Mantém a comunicação ligada à oportunidade, aos documentos e às decisões do processo.",
    icon: Handshake,
  },
]

export const platformMetrics = [
  { label: "Startups no pipeline", value: "24", trend: "+18%" },
  { label: "Investidores ativos", value: "36", trend: "+12%" },
  { label: "Data rooms", value: "18", trend: "+22%" },
  { label: "Negociações", value: "7", trend: "+16%" },
]

export const funnelStages = [
  { stage: "Triagem", count: 48, width: "100%", color: "#0F3D3E" },
  { stage: "Avaliação", count: 24, width: "72%", color: "#145A5B" },
  { stage: "Due Diligence", count: 12, width: "48%", color: "#6F938F" },
  { stage: "Term Sheet", count: 7, width: "32%", color: "#C9A227" },
  { stage: "Fechado", count: 3, width: "20%", color: "#E6D39A" },
]

export const recentActivities = [
  {
    title: "Data room consultado",
    detail: "Fintech Kwanza · há 2h",
    icon: Database,
  },
  {
    title: "Documentos enviados",
    detail: "HealthTech Angola · há 5h",
    icon: FileCheck,
  },
  {
    title: "Due diligence iniciada",
    detail: "AgriTech Luanda · há 1 dia",
    icon: ClipboardCheck,
  },
]

export const processSteps = [
  {
    title: "Preparar a startup",
    text: "A equipa estrutura tração, métricas, proposta de valor e necessidade de capital.",
  },
  {
    title: "Validar o data room",
    text: "A documentação é organizada e revista antes de ser partilhada com investidores.",
  },
  {
    title: "Qualificar investidores",
    text: "As oportunidades chegam a investidores com informação padronizada e rastreável.",
  },
  {
    title: "Acompanhar a decisão",
    text: "A due diligence apoia a negociação até à decisão, term sheet ou encerramento.",
  },
]

export const securityItems: LandingIconItem[] = [
  {
    title: "Acessos granulares",
    text: "Permissões por investidor, oportunidade, data room e documento sensível.",
    icon: LockKeyhole,
  },
  {
    title: "Documentos controlados",
    text: "Histórico de atualização para reduzir anexos dispersos e versões perdidas.",
    icon: FolderLock,
  },
  {
    title: "Checklist de risco",
    text: "Validação guiada para compliance, finanças, equipa, mercado e tração.",
    icon: ShieldCheck,
  },
]
