export type InvestorProfile = {
  name: string
  type: string
  lead: string
  thesis: string
  location: string
  email: string
  phone: string
  website: string
  ticket: string
  stage: string
  geography: string
  status: string
  sectors: string[]
}

export type InvestorMetric = {
  id: string
  label: string
  value: string
  trend: string
  href: string
}

export type InvestorOpportunity = {
  id: string
  name: string
  sector: string
  stage: string
  location: string
  match: number
  ask: string
  status: "Nova" | "Em análise" | "Due diligence" | "Term sheet"
  summary: string
  metrics: string[]
  diligenceStatus: string
  nextAction: string
}

export type InvestorPipelineDeal = {
  id: string
  startup: string
  stage: string
  owner: string
  value: string
  nextStep: string
  href: string
}

export type InvestorDiligenceTask = {
  id: string
  title: string
  startup: string
  status: "Pendente" | "Em revisão" | "Completo"
  dueAt: string
  href: string
}

export type InvestorDataRoomAccess = {
  id: string
  startup: string
  category: string
  access: string
  updatedAt: string
  href: string
}

export type InvestorMessage = {
  id: string
  from: string
  role: string
  subject: string
  body: string
  receivedAt: string
  unread: boolean
  href: string
}

export type InvestorNotification = {
  id: string
  title: string
  body: string
  receivedAt: string
  tone: "info" | "success" | "warning"
  unread: boolean
  href: string
}

const investorProfile: InvestorProfile = {
  name: "Kwanza Capital Partners",
  type: "Fundo early-stage",
  lead: "Helena Duarte",
  thesis:
    "Investimos em startups B2B e infraestrutura digital com tração inicial, governança clara e potencial regional.",
  location: "Luanda, Angola",
  email: "deals@kwanzacapital.ao",
  phone: "+244 924 880 110",
  website: "kwanzacapital.ao",
  ticket: "USD 50k - 300k",
  stage: "Pre-seed / Seed",
  geography: "Angola e África Austral",
  status: "Mandato ativo",
  sectors: ["Fintech", "AgriTech", "B2B SaaS", "HealthTech"],
}

const investorMetrics: InvestorMetric[] = [
  {
    id: "matched",
    label: "Oportunidades compatíveis",
    value: "18",
    trend: "+5 esta semana",
    href: "/investor/opportunities",
  },
  {
    id: "active-dd",
    label: "Due diligence ativa",
    value: "4",
    trend: "2 com bloqueios",
    href: "/investor/diligence",
  },
  {
    id: "pipeline",
    label: "Pipeline em análise",
    value: "USD 1.2M",
    trend: "ticket médio USD 180k",
    href: "/investor/pipeline",
  },
  {
    id: "data-rooms",
    label: "Data rooms abertos",
    value: "7",
    trend: "3 atualizados hoje",
    href: "/investor/data-rooms",
  },
]

const investorOpportunities: InvestorOpportunity[] = [
  {
    id: "agripay-angola",
    name: "AgriPay Angola",
    sector: "Fintech agrícola",
    stage: "Pre-seed",
    location: "Luanda, Angola",
    match: 94,
    ask: "USD 250k",
    status: "Due diligence",
    summary:
      "Pagamentos e microcrédito para pequenos produtores rurais com tração em cooperativas.",
    metrics: ["USD 12.4k MRR", "1.280 clientes ativos", "24% crescimento MoM"],
    diligenceStatus: "Cap table pendente",
    nextAction: "Rever modelo financeiro e validar cap table.",
  },
  {
    id: "clinicflow",
    name: "ClinicFlow",
    sector: "HealthTech",
    stage: "Seed",
    location: "Luanda, Angola",
    match: 88,
    ask: "USD 400k",
    status: "Em análise",
    summary:
      "Software operacional para clínicas privadas com agenda, faturação e relatórios.",
    metrics: ["42 clínicas", "USD 18k MRR", "3.1% churn mensal"],
    diligenceStatus: "Documentos financeiros em revisão",
    nextAction: "Solicitar coorte de retenção por clínica.",
  },
  {
    id: "edupay-ao",
    name: "EduPay AO",
    sector: "EdTech / Payments",
    stage: "Pre-seed",
    location: "Benguela, Angola",
    match: 81,
    ask: "USD 150k",
    status: "Nova",
    summary:
      "Cobranças escolares digitais para escolas privadas e centros de formação.",
    metrics: ["18 escolas", "7.200 estudantes", "USD 9k GMV mensal"],
    diligenceStatus: "Perfil ainda em preparação",
    nextAction: "Avaliar qualidade da receita e concentração de clientes.",
  },
]

const investorPipeline: InvestorPipelineDeal[] = [
  {
    id: "pipe-001",
    startup: "AgriPay Angola",
    stage: "Due diligence",
    owner: "Helena Duarte",
    value: "USD 250k",
    nextStep: "Cap table e modelo financeiro",
    href: "/investor/opportunities/agripay-angola",
  },
  {
    id: "pipe-002",
    startup: "ClinicFlow",
    stage: "Avaliação",
    owner: "Mário Paulo",
    value: "USD 400k",
    nextStep: "Retenção por coorte",
    href: "/investor/opportunities/clinicflow",
  },
  {
    id: "pipe-003",
    startup: "EduPay AO",
    stage: "Triagem",
    owner: "Helena Duarte",
    value: "USD 150k",
    nextStep: "Validação de receita",
    href: "/investor/opportunities/edupay-ao",
  },
]

const investorDiligenceTasks: InvestorDiligenceTask[] = [
  {
    id: "dd-001",
    title: "Validar cap table",
    startup: "AgriPay Angola",
    status: "Pendente",
    dueAt: "Hoje",
    href: "/investor/opportunities/agripay-angola",
  },
  {
    id: "dd-002",
    title: "Rever modelo financeiro",
    startup: "AgriPay Angola",
    status: "Em revisão",
    dueAt: "Amanhã",
    href: "/investor/data-rooms",
  },
  {
    id: "dd-003",
    title: "Confirmar churn mensal",
    startup: "ClinicFlow",
    status: "Pendente",
    dueAt: "Esta semana",
    href: "/investor/opportunities/clinicflow",
  },
  {
    id: "dd-004",
    title: "Revisar certidão comercial",
    startup: "AgriPay Angola",
    status: "Completo",
    dueAt: "Ontem",
    href: "/investor/data-rooms",
  },
]

const investorDataRooms: InvestorDataRoomAccess[] = [
  {
    id: "room-agripay",
    startup: "AgriPay Angola",
    category: "Finanças, legal e pitch",
    access: "Acesso completo",
    updatedAt: "Atualizado hoje",
    href: "/investor/opportunities/agripay-angola",
  },
  {
    id: "room-clinicflow",
    startup: "ClinicFlow",
    category: "Métricas e finanças",
    access: "Acesso parcial",
    updatedAt: "Atualizado há 2 dias",
    href: "/investor/opportunities/clinicflow",
  },
  {
    id: "room-edupay",
    startup: "EduPay AO",
    category: "Perfil e pitch",
    access: "Solicitação pendente",
    updatedAt: "Pendente",
    href: "/investor/opportunities/edupay-ao",
  },
]

const investorMessages: InvestorMessage[] = [
  {
    id: "inv-msg-001",
    from: "Miguel Sebastião",
    role: "CEO, AgriPay Angola",
    subject: "Cap table atualizado",
    body: "A equipa está a preparar a versão atualizada do cap table para anexar ao data room.",
    receivedAt: "Há 18 min",
    unread: true,
    href: "/investor/messages#inv-msg-001",
  },
  {
    id: "inv-msg-002",
    from: "Equipa SEED",
    role: "Pipeline",
    subject: "Nova oportunidade compatível",
    body: "EduPay AO entrou no pipeline com bom encaixe para fintech e pagamentos educacionais.",
    receivedAt: "Hoje, 10:15",
    unread: true,
    href: "/investor/messages#inv-msg-002",
  },
  {
    id: "inv-msg-003",
    from: "Beatriz Domingos",
    role: "COO, AgriPay Angola",
    subject: "Pergunta sobre operações",
    body: "Podemos detalhar o processo de onboarding das cooperativas na próxima reunião.",
    receivedAt: "Ontem",
    unread: false,
    href: "/investor/messages#inv-msg-003",
  },
]

const investorNotifications: InvestorNotification[] = [
  {
    id: "inv-ntf-001",
    title: "Novo documento no data room",
    body: "AgriPay Angola atualizou o modelo financeiro.",
    receivedAt: "Agora",
    tone: "success",
    unread: true,
    href: "/investor/data-rooms",
  },
  {
    id: "inv-ntf-002",
    title: "Tarefa de due diligence pendente",
    body: "Validação do cap table vence hoje.",
    receivedAt: "Há 1 h",
    tone: "warning",
    unread: true,
    href: "/investor/diligence",
  },
  {
    id: "inv-ntf-003",
    title: "Pipeline atualizado",
    body: "ClinicFlow avançou para avaliação.",
    receivedAt: "Ontem",
    tone: "info",
    unread: false,
    href: "/investor/pipeline",
  },
]

export function getInvestorProfile() {
  return investorProfile
}

export function getInvestorMetrics() {
  return investorMetrics
}

export function getInvestorOpportunities() {
  return investorOpportunities
}

export function getInvestorOpportunity(startupId: string) {
  return investorOpportunities.find((opportunity) => opportunity.id === startupId)
}

export function getInvestorPipeline() {
  return investorPipeline
}

export function getInvestorDiligenceTasks() {
  return investorDiligenceTasks
}

export function getInvestorDataRooms() {
  return investorDataRooms
}

export function getInvestorMessages() {
  return investorMessages
}

export function getInvestorNotifications() {
  return investorNotifications
}
