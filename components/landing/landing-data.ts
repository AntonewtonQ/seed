import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CircleDollarSign,
  Database,
  FolderLock,
  Handshake,
  LockKeyhole,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";

export type LandingIconItem = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const navLinks = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#plataforma", label: "Produto" },
  { href: "#processo", label: "Como funciona" },
  { href: "#seguranca", label: "Segurança" },
];

export const heroStats = [
  { value: "Rondas", label: "metas e moedas explícitas" },
  { value: "Histórico", label: "etapas e interações registadas" },
  { value: "Acessos", label: "documentos com autorização" },
];

export const audienceCards: LandingIconItem[] = [
  {
    title: "Startups aceleradas",
    text: "Organizam o perfil, as rondas e o acompanhamento de cada potencial investidor.",
    icon: Building2,
  },
  {
    title: "Investidores",
    text: "Consultam as negociações associadas à sua organização e os documentos autorizados.",
    icon: CircleDollarSign,
  },
  {
    title: "Aceleradoras",
    text: "Consultam as rondas e negociações das startups vinculadas à sua organização.",
    icon: UsersRound,
  },
];

export const modules: LandingIconItem[] = [
  {
    title: "Investor Pipeline",
    text: "Organiza negociações por ronda e investidor, com etapas, histórico e próximo passo.",
    icon: TrendingUp,
  },
  {
    title: "Data Room",
    text: "Guarda documentos privados e permite conceder ou revogar acesso a cada organização.",
    icon: Database,
  },
  {
    title: "Indicadores por ronda",
    text: "Apresenta conversão e tempo até ao primeiro compromisso, com ausência de dados explícita.",
    icon: ShieldCheck,
  },
  {
    title: "Interações e decisões",
    text: "Regista contactos, reuniões e notas na negociação. Não envia mensagens externas.",
    icon: Handshake,
  },
];

export const processSteps = [
  {
    title: "Preparar a startup",
    text: "A equipa mantém o perfil e abre uma ronda com meta e moeda.",
  },
  {
    title: "Organizar o data room",
    text: "A equipa anexa documentos e escolhe explicitamente quem pode aceder.",
  },
  {
    title: "Acompanhar investidores",
    text: "Cada investidor fica associado a uma negociação concreta, com registo de interações.",
  },
  {
    title: "Acompanhar a decisão",
    text: "Intenções e term sheets são acompanhados sem os confundir com dinheiro recebido.",
  },
];

export const securityItems: LandingIconItem[] = [
  {
    title: "Acessos granulares",
    text: "Verificação de organização e recurso no servidor, em cada operação.",
    icon: LockKeyhole,
  },
  {
    title: "Documentos controlados",
    text: "Documentos privados por defeito, com concessão e revogação explícitas.",
    icon: FolderLock,
  },
  {
    title: "Sessões autenticadas",
    text: "Credenciais verificadas e sessões com expiração na demonstração local.",
    icon: ShieldCheck,
  },
];
