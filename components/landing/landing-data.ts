import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CircleDollarSign,
  FolderLock,
  LockKeyhole,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

export type LandingIconItem = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const navLinks = [
  { href: "#para-quem", label: "Para quem" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#seguranca", label: "Segurança" },
];

export const audienceCards: LandingIconItem[] = [
  {
    title: "Startups",
    text: "Gerem o perfil, as rondas, as negociações com cada investidor e os documentos.",
    icon: Building2,
  },
  {
    title: "Investidores",
    text: "Consultam as negociações da sua organização e os documentos que lhes foram partilhados.",
    icon: CircleDollarSign,
  },
  {
    title: "Aceleradoras",
    text: "Acompanham as rondas e as negociações das startups vinculadas.",
    icon: UsersRound,
  },
];

export const processSteps = [
  {
    title: "Abrir uma ronda",
    text: "Defina o nome, a meta e a moeda.",
  },
  {
    title: "Acompanhar cada investidor",
    text: "Registe reuniões e notas e atualize a etapa da negociação.",
  },
  {
    title: "Partilhar documentos",
    text: "Conceda ou revogue o acesso a cada documento.",
  },
  {
    title: "Consultar indicadores",
    text: "Veja a conversão e o tempo até ao primeiro soft commit, com a base de cálculo.",
  },
];

export const securityItems: LandingIconItem[] = [
  {
    title: "Acesso verificado no servidor",
    text: "Cada pedido confirma a organização e o recurso.",
    icon: LockKeyhole,
  },
  {
    title: "Documentos privados por defeito",
    text: "Só ficam visíveis para quem recebe autorização explícita.",
    icon: FolderLock,
  },
  {
    title: "Sessões com expiração",
    text: "As sessões terminam ao fim de 8 horas.",
    icon: ShieldCheck,
  },
];

export const limits = [
  "Não recebe, transfere nem regista dinheiro.",
  "Um soft commit é uma intenção, não um investimento.",
  "O estado do term sheet é um registo manual, sem assinatura eletrónica.",
  "Não envia emails nem mensagens externas.",
];
