export type StartupDocumentStatus = "Pronto" | "Em revisão" | "Em falta"

export type StartupProfile = {
  name: string
  tagline: string
  sector: string
  stage: string
  location: string
  website: string
  email: string
  phone: string
  founded: string
  completeness: number
  status: string
  fundingTarget: string
  fundingInstrument: string
  runway: string
  nextStep: string
}

export type StartupContact = {
  kind: "location" | "website" | "email" | "phone"
  label: string
}

export type StartupMetric = {
  id: string
  label: string
  value: string
  trend: string
  href: string
}

export type PitchBlock = {
  id: string
  title: string
  text: string
}

export type FundingUse = {
  label: string
  value: number
}

export type TeamMember = {
  id: string
  name: string
  role: string
  detail: string
}

export type StartupDocument = {
  id: string
  name: string
  category: string
  updatedAt: string
  status: StartupDocumentStatus
  owner: string
  visibility: string
  description: string
  requiredAction: string
}

export type ReadinessItem = {
  label: string
  progress: number
  status: string
  href: string
}

export type StartupActionItem = {
  label: string
  detail: string
  href: string
}

export type StartupMessage = {
  id: string
  from: string
  role: string
  subject: string
  body: string
  receivedAt: string
  unread: boolean
  href: string
}

export type StartupNotification = {
  id: string
  title: string
  body: string
  receivedAt: string
  tone: "info" | "warning" | "success"
  unread: boolean
  href: string
}

const startupProfile: StartupProfile = {
  name: "AgriPay Angola",
  tagline: "Pagamentos e microcrédito para pequenos produtores rurais.",
  sector: "Fintech agrícola",
  stage: "Pre-seed",
  location: "Luanda, Angola",
  website: "agripay.ao",
  email: "founders@agripay.ao",
  phone: "+244 923 456 789",
  founded: "2025",
  completeness: 76,
  status: "Perfil em preparação",
  fundingTarget: "USD 250k",
  fundingInstrument: "SAFE / Equity",
  runway: "9 meses",
  nextStep: "Finalizar cap table e demonstrações financeiras",
}

const startupContacts: StartupContact[] = [
  { kind: "location", label: startupProfile.location },
  { kind: "website", label: startupProfile.website },
  { kind: "email", label: startupProfile.email },
  { kind: "phone", label: startupProfile.phone },
]

const startupMetrics: StartupMetric[] = [
  {
    id: "monthly-revenue",
    label: "Receita mensal",
    value: "USD 12.4k",
    trend: "+18% no mês",
    href: "/startup/metrics",
  },
  {
    id: "active-clients",
    label: "Clientes ativos",
    value: "1.280",
    trend: "+212 novos",
    href: "/startup/metrics",
  },
  {
    id: "mom-growth",
    label: "Crescimento MoM",
    value: "24%",
    trend: "3 meses seguidos",
    href: "/startup/metrics",
  },
  {
    id: "runway",
    label: "Runway",
    value: "9 meses",
    trend: "pré-captação",
    href: "/startup/funding",
  },
]

const pitchBlocks: PitchBlock[] = [
  {
    id: "problem",
    title: "Problema",
    text: "Pequenos produtores têm dificuldade em receber pagamentos digitais, comprovar vendas e aceder a capital de curto prazo.",
  },
  {
    id: "solution",
    title: "Solução",
    text: "A AgriPay cria uma carteira simples para pagamentos, histórico transacional e elegibilidade para microcrédito produtivo.",
  },
  {
    id: "product",
    title: "Produto",
    text: "Aplicação mobile leve, painel para cooperativas e motor de scoring baseado em transações verificadas.",
  },
  {
    id: "market",
    title: "Mercado",
    text: "Foco inicial em cooperativas agrícolas urbanas e periurbanas, com expansão para cadeias de fornecimento regionais.",
  },
]

const fundingUse: FundingUse[] = [
  { label: "Produto", value: 40 },
  { label: "Operações", value: 25 },
  { label: "Vendas", value: 20 },
  { label: "Compliance", value: 15 },
]

const teamMembers: TeamMember[] = [
  {
    id: "miguel-sebastiao",
    name: "Miguel Sebastião",
    role: "CEO",
    detail: "Parcerias, estratégia e relação com cooperativas.",
  },
  {
    id: "beatriz-domingos",
    name: "Beatriz Domingos",
    role: "COO",
    detail: "Operações, onboarding e suporte a produtores.",
  },
  {
    id: "nelson-mateus",
    name: "Nelson Mateus",
    role: "CTO",
    detail: "Produto, integrações e segurança da plataforma.",
  },
]

const startupDocuments: StartupDocument[] = [
  {
    id: "pitch-deck",
    name: "Pitch deck",
    category: "Apresentação",
    updatedAt: "Atualizado hoje",
    status: "Pronto",
    owner: "Miguel Sebastião",
    visibility: "Pronto para investidores qualificados",
    description: "Apresentação principal com problema, solução, mercado, equipa e captação.",
    requiredAction: "Garantir que o deck e o modelo financeiro contam a mesma história.",
  },
  {
    id: "financial-model",
    name: "Modelo financeiro",
    category: "Finanças",
    updatedAt: "Atualizado há 2 dias",
    status: "Em revisão",
    owner: "Beatriz Domingos",
    visibility: "Interno até validação",
    description: "Projeções de receita, custos, runway e cenários de uso dos fundos.",
    requiredAction: "Validar premissas de crescimento e margem antes da partilha.",
  },
  {
    id: "commercial-certificate",
    name: "Certidão comercial",
    category: "Legal",
    updatedAt: "Atualizado há 1 semana",
    status: "Pronto",
    owner: "Nelson Mateus",
    visibility: "Disponível no data room",
    description: "Documento legal de constituição e situação comercial da startup.",
    requiredAction: "Confirmar se a versão anexada é a mais recente.",
  },
  {
    id: "cap-table",
    name: "Cap table",
    category: "Governança",
    updatedAt: "Pendente",
    status: "Em falta",
    owner: "Miguel Sebastião",
    visibility: "Bloqueado até submissão",
    description: "Estrutura acionista, participações dos fundadores e eventuais instrumentos emitidos.",
    requiredAction: "Adicionar cap table atualizado antes de abrir due diligence.",
  },
]

const readinessChecklist: ReadinessItem[] = [
  { label: "Identidade da startup", progress: 100, status: "Completo", href: "/startup/profile" },
  { label: "Pitch e narrativa", progress: 88, status: "Quase pronto", href: "/startup/pitch/wizard" },
  { label: "Métricas de tração", progress: 74, status: "Em revisão", href: "/startup/metrics" },
  { label: "Documentos financeiros", progress: 62, status: "Precisa validar", href: "/startup/documents/financial-model" },
  { label: "Cap table", progress: 35, status: "Pendente", href: "/startup/documents/cap-table" },
]

const startupMilestones = [
  "MVP validado com 3 cooperativas",
  "1.280 produtores registados",
  "Primeiro ciclo de crédito concluído",
  "Data room em preparação para investidores",
]

const nextActions: StartupActionItem[] = [
  {
    label: "Adicionar cap table atualizado",
    detail: "Bloqueia a prontidão legal do data room.",
    href: "/startup/documents/new?type=cap-table",
  },
  {
    label: "Rever demonstrações financeiras",
    detail: "Alinha projeções com a narrativa de captação.",
    href: "/startup/documents/financial-model",
  },
  {
    label: "Completar biografias dos fundadores",
    detail: "Melhora a confiança de investidores na equipa.",
    href: "/startup/team/new",
  },
  {
    label: "Validar documentação legal antes da partilha",
    detail: "Reduz fricção no início da due diligence.",
    href: "/startup/checklist",
  },
]

const startupMessages: StartupMessage[] = [
  {
    id: "msg-001",
    from: "Ana Matias",
    role: "Analista de investimento",
    subject: "Pergunta sobre modelo financeiro",
    body: "A equipa quer confirmar as premissas de margem e CAC antes da próxima reunião.",
    receivedAt: "Há 12 min",
    unread: true,
    href: "/startup/messages#msg-001",
  },
  {
    id: "msg-002",
    from: "Comité SEED",
    role: "Due diligence",
    subject: "Revisão do data room",
    body: "O pitch deck está pronto; falta anexar o cap table atualizado.",
    receivedAt: "Hoje, 09:20",
    unread: true,
    href: "/startup/messages#msg-002",
  },
  {
    id: "msg-003",
    from: "Marta Correia",
    role: "Aceleradora parceira",
    subject: "Feedback de narrativa",
    body: "A proposta de valor está clara, mas vale reforçar o caso de uso das cooperativas.",
    receivedAt: "Ontem",
    unread: false,
    href: "/startup/messages#msg-003",
  },
]

const startupNotifications: StartupNotification[] = [
  {
    id: "ntf-001",
    title: "Cap table pendente",
    body: "Este documento é necessário antes de abrir o data room.",
    receivedAt: "Agora",
    tone: "warning",
    unread: true,
    href: "/startup/documents/cap-table",
  },
  {
    id: "ntf-002",
    title: "Pitch deck pronto",
    body: "A versão principal já pode ser pré-visualizada.",
    receivedAt: "Há 1 h",
    tone: "success",
    unread: true,
    href: "/startup/pitch/deck",
  },
  {
    id: "ntf-003",
    title: "Métricas atualizadas",
    body: "Foram registados novos dados de tração mensal.",
    receivedAt: "Ontem",
    tone: "info",
    unread: false,
    href: "/startup/metrics",
  },
]

export function getStartupProfile() {
  return startupProfile
}

export function getStartupContacts() {
  return startupContacts
}

export function getStartupMetrics() {
  return startupMetrics
}

export function getPitchBlocks() {
  return pitchBlocks
}

export function getFundingUse() {
  return fundingUse
}

export function getTeamMembers() {
  return teamMembers
}

export function getStartupDocuments() {
  return startupDocuments
}

export function getStartupDocument(documentId: string) {
  return startupDocuments.find((document) => document.id === documentId)
}

export function getReadinessChecklist() {
  return readinessChecklist
}

export function getStartupMilestones() {
  return startupMilestones
}

export function getNextActions() {
  return nextActions
}

export function getStartupMessages() {
  return startupMessages
}

export function getStartupNotifications() {
  return startupNotifications
}
