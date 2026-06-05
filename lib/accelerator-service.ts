export type AcceleratorProfile = {
  name: string
  type: string
  lead: string
  tagline: string
  location: string
  email: string
  phone: string
  website: string
  cohort: string
  focus: string
  status: string
  thesis: string
  sectors: string[]
}

export type AcceleratorMetric = {
  id: string
  label: string
  value: string
  trend: string
  href: string
}

export type AcceleratedStartup = {
  id: string
  name: string
  sector: string
  stage: string
  founder: string
  location: string
  readiness: number
  status: "Em preparação" | "Pronta para investidores" | "Em due diligence" | "Bloqueada"
  ask: string
  summary: string
  blockers: string[]
  nextAction: string
}

export type AcceleratorProgram = {
  id: string
  name: string
  cohort: string
  startups: number
  status: "Ativo" | "Planeado" | "Encerrado"
  focus: string
  nextMilestone: string
}

export type AcceleratorPipelineItem = {
  id: string
  startup: string
  stage: string
  owner: string
  readiness: string
  nextStep: string
  href: string
}

export type AcceleratorDiligenceTask = {
  id: string
  title: string
  startup: string
  status: "Pendente" | "Em revisão" | "Completo"
  dueAt: string
  href: string
}

export type AcceleratorDataRoom = {
  id: string
  startup: string
  category: string
  status: "Completo" | "Em revisão" | "Com bloqueios"
  updatedAt: string
  href: string
}

export type AcceleratorMessage = {
  id: string
  from: string
  role: string
  subject: string
  body: string
  receivedAt: string
  unread: boolean
  href: string
}

export type AcceleratorNotification = {
  id: string
  title: string
  body: string
  receivedAt: string
  tone: "info" | "success" | "warning"
  unread: boolean
  href: string
}

const acceleratorProfile: AcceleratorProfile = {
  name: "SeedLab Luanda",
  type: "Aceleradora early-stage",
  lead: "Patrícia Manuel",
  tagline:
    "Preparamos startups angolanas para captação com governança, dados e data rooms seguros.",
  location: "Luanda, Angola",
  email: "programs@seedlab.ao",
  phone: "+244 925 300 441",
  website: "seedlab.ao",
  cohort: "Cohort 2026",
  focus: "Fintech, AgriTech e B2B SaaS",
  status: "Programa ativo",
  thesis:
    "Aceleramos startups com tração inicial e potencial regional, preparando-as para investidores qualificados.",
  sectors: ["Fintech", "AgriTech", "B2B SaaS", "HealthTech"],
}

const acceleratorMetrics: AcceleratorMetric[] = [
  {
    id: "portfolio",
    label: "Startups acompanhadas",
    value: "24",
    trend: "8 em preparação final",
    href: "/accelerator/startups",
  },
  {
    id: "investor-ready",
    label: "Prontas para investidores",
    value: "11",
    trend: "+3 este mês",
    href: "/accelerator/pipeline",
  },
  {
    id: "data-rooms",
    label: "Data rooms ativos",
    value: "18",
    trend: "5 com bloqueios",
    href: "/accelerator/data-rooms",
  },
  {
    id: "diligence",
    label: "Tarefas de due diligence",
    value: "32",
    trend: "12 pendentes",
    href: "/accelerator/diligence",
  },
]

const acceleratedStartups: AcceleratedStartup[] = [
  {
    id: "agripay-angola",
    name: "AgriPay Angola",
    sector: "Fintech agrícola",
    stage: "Pre-seed",
    founder: "Miguel Sebastião",
    location: "Luanda, Angola",
    readiness: 76,
    status: "Em due diligence",
    ask: "USD 250k",
    summary:
      "Pagamentos e microcrédito para pequenos produtores rurais com pilotos em cooperativas.",
    blockers: ["Cap table pendente", "Modelo financeiro em revisão"],
    nextAction: "Finalizar cap table e validar demonstrações financeiras.",
  },
  {
    id: "clinicflow",
    name: "ClinicFlow",
    sector: "HealthTech",
    stage: "Seed",
    founder: "Carla Tavares",
    location: "Luanda, Angola",
    readiness: 84,
    status: "Pronta para investidores",
    ask: "USD 400k",
    summary:
      "Sistema operacional para clínicas com agenda, faturação, relatórios e retenção de pacientes.",
    blockers: ["Coortes de retenção precisam de revisão"],
    nextAction: "Preparar reunião com investidores do setor saúde.",
  },
  {
    id: "edupay-ao",
    name: "EduPay AO",
    sector: "EdTech / Payments",
    stage: "Pre-seed",
    founder: "Nádia Costa",
    location: "Benguela, Angola",
    readiness: 58,
    status: "Em preparação",
    ask: "USD 150k",
    summary:
      "Cobranças escolares digitais para escolas privadas e centros de formação.",
    blockers: ["Métricas de receita incompletas", "Pitch precisa de revisão"],
    nextAction: "Completar métricas e reforçar narrativa de mercado.",
  },
  {
    id: "logisync",
    name: "LogiSync",
    sector: "LogTech",
    stage: "MVP",
    founder: "Tomás Andrade",
    location: "Huambo, Angola",
    readiness: 41,
    status: "Bloqueada",
    ask: "USD 120k",
    summary:
      "Roteirização e coordenação de entregas para pequenos operadores logísticos.",
    blockers: ["Documentação legal em falta", "Tração ainda não validada"],
    nextAction: "Validar pilotos e regularizar documentação legal.",
  },
]

const acceleratorPrograms: AcceleratorProgram[] = [
  {
    id: "cohort-2026",
    name: "SEED Acceleration Track",
    cohort: "Cohort 2026",
    startups: 24,
    status: "Ativo",
    focus: "Preparação para captação e data room",
    nextMilestone: "Demo day com investidores qualificados",
  },
  {
    id: "fintech-sprint",
    name: "Fintech Sprint",
    cohort: "Sprint Q3",
    startups: 8,
    status: "Planeado",
    focus: "Payments, compliance e métricas financeiras",
    nextMilestone: "Seleção das startups participantes",
  },
  {
    id: "growth-clinic",
    name: "Growth Clinic",
    cohort: "Q2 2026",
    startups: 12,
    status: "Encerrado",
    focus: "Tração, vendas B2B e reporting",
    nextMilestone: "Relatório final de progresso",
  },
]

const acceleratorPipeline: AcceleratorPipelineItem[] = [
  {
    id: "pipe-001",
    startup: "AgriPay Angola",
    stage: "Due diligence",
    owner: "Patrícia Manuel",
    readiness: "76%",
    nextStep: "Cap table e modelo financeiro",
    href: "/accelerator/startups/agripay-angola",
  },
  {
    id: "pipe-002",
    startup: "ClinicFlow",
    stage: "Investor ready",
    owner: "Dário Mendes",
    readiness: "84%",
    nextStep: "Agenda com investidores HealthTech",
    href: "/accelerator/startups/clinicflow",
  },
  {
    id: "pipe-003",
    startup: "EduPay AO",
    stage: "Preparação",
    owner: "Patrícia Manuel",
    readiness: "58%",
    nextStep: "Revisar métricas e pitch",
    href: "/accelerator/startups/edupay-ao",
  },
]

const acceleratorDiligenceTasks: AcceleratorDiligenceTask[] = [
  {
    id: "acc-dd-001",
    title: "Recolher cap table atualizado",
    startup: "AgriPay Angola",
    status: "Pendente",
    dueAt: "Hoje",
    href: "/accelerator/startups/agripay-angola",
  },
  {
    id: "acc-dd-002",
    title: "Validar modelo financeiro",
    startup: "AgriPay Angola",
    status: "Em revisão",
    dueAt: "Amanhã",
    href: "/accelerator/data-rooms",
  },
  {
    id: "acc-dd-003",
    title: "Completar coortes de retenção",
    startup: "ClinicFlow",
    status: "Pendente",
    dueAt: "Esta semana",
    href: "/accelerator/startups/clinicflow",
  },
  {
    id: "acc-dd-004",
    title: "Rever certidão comercial",
    startup: "AgriPay Angola",
    status: "Completo",
    dueAt: "Ontem",
    href: "/accelerator/data-rooms",
  },
]

const acceleratorDataRooms: AcceleratorDataRoom[] = [
  {
    id: "room-agripay",
    startup: "AgriPay Angola",
    category: "Finanças, legal e pitch",
    status: "Com bloqueios",
    updatedAt: "Atualizado hoje",
    href: "/accelerator/startups/agripay-angola",
  },
  {
    id: "room-clinicflow",
    startup: "ClinicFlow",
    category: "Métricas e finanças",
    status: "Em revisão",
    updatedAt: "Atualizado há 2 dias",
    href: "/accelerator/startups/clinicflow",
  },
  {
    id: "room-edupay",
    startup: "EduPay AO",
    category: "Perfil e pitch",
    status: "Com bloqueios",
    updatedAt: "Pendente",
    href: "/accelerator/startups/edupay-ao",
  },
]

const acceleratorMessages: AcceleratorMessage[] = [
  {
    id: "acc-msg-001",
    from: "Miguel Sebastião",
    role: "CEO, AgriPay Angola",
    subject: "Cap table em atualização",
    body: "A equipa vai anexar a nova versão do cap table ainda hoje.",
    receivedAt: "Há 22 min",
    unread: true,
    href: "/accelerator/messages#acc-msg-001",
  },
  {
    id: "acc-msg-002",
    from: "Helena Duarte",
    role: "Kwanza Capital Partners",
    subject: "Perguntas para ClinicFlow",
    body: "Precisamos de dados adicionais sobre churn e retenção por clínica.",
    receivedAt: "Hoje, 10:40",
    unread: true,
    href: "/accelerator/messages#acc-msg-002",
  },
  {
    id: "acc-msg-003",
    from: "Equipa SEED",
    role: "Operações",
    subject: "Demo day",
    body: "A lista de startups elegíveis para o demo day deve ser fechada esta semana.",
    receivedAt: "Ontem",
    unread: false,
    href: "/accelerator/messages#acc-msg-003",
  },
]

const acceleratorNotifications: AcceleratorNotification[] = [
  {
    id: "acc-ntf-001",
    title: "Data room com bloqueio",
    body: "AgriPay Angola ainda precisa anexar o cap table atualizado.",
    receivedAt: "Agora",
    tone: "warning",
    unread: true,
    href: "/accelerator/data-rooms",
  },
  {
    id: "acc-ntf-002",
    title: "Startup pronta para investidores",
    body: "ClinicFlow atingiu 84% de prontidão e pode avançar para matching.",
    receivedAt: "Há 1 h",
    tone: "success",
    unread: true,
    href: "/accelerator/startups/clinicflow",
  },
  {
    id: "acc-ntf-003",
    title: "Programa atualizado",
    body: "SEED Acceleration Track recebeu novo marco para demo day.",
    receivedAt: "Ontem",
    tone: "info",
    unread: false,
    href: "/accelerator/programs",
  },
]

export function getAcceleratorProfile() {
  return acceleratorProfile
}

export function getAcceleratorMetrics() {
  return acceleratorMetrics
}

export function getAcceleratedStartups() {
  return acceleratedStartups
}

export function getAcceleratedStartup(startupId: string) {
  return acceleratedStartups.find((startup) => startup.id === startupId)
}

export function getAcceleratorPrograms() {
  return acceleratorPrograms
}

export function getAcceleratorPipeline() {
  return acceleratorPipeline
}

export function getAcceleratorDiligenceTasks() {
  return acceleratorDiligenceTasks
}

export function getAcceleratorDataRooms() {
  return acceleratorDataRooms
}

export function getAcceleratorMessages() {
  return acceleratorMessages
}

export function getAcceleratorNotifications() {
  return acceleratorNotifications
}
