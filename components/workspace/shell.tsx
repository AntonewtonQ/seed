"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";
import {
  LayoutDashboard,
  Building2,
  Layers,
  Handshake,
  FolderLock,
  ChartNoAxesCombined,
  LogOut,
  Menu,
  X,
  Info,
  type LucideIcon,
} from "lucide-react";
import { SeedLogo } from "@/components/brand/seed-logo";
import { useWorkspace } from "./context";
const roles = {
  startup: "Área da startup",
  investor: "Área do investidor",
  accelerator: "Área da aceleradora",
};
export function WorkspaceShell({ children }: { children: ReactNode }) {
  const { data, run, busy, notice, dismiss } = useWorkspace();
  const path = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const role = data.actor.kind;
  const nav: { href: string; label: string; icon: LucideIcon }[] = [
    { href: "/workspace", label: "Painel", icon: LayoutDashboard },
    ...(role === "startup"
      ? [{ href: "/workspace/profile", label: "Meu perfil", icon: Building2 }]
      : role === "accelerator"
        ? [{ href: "/workspace/startups", label: "Startups", icon: Building2 }]
        : []),
    ...(role !== "investor"
      ? [{ href: "/workspace/rounds", label: "Rondas", icon: Layers }]
      : []),
    {
      href: "/workspace/opportunities",
      label: role === "investor" ? "Oportunidades" : "Negociações",
      icon: Handshake,
    },
    { href: "/workspace/documents", label: "Documentos", icon: FolderLock },
    ...(role !== "investor"
      ? [
          {
            href: "/workspace/metrics",
            label: "Indicadores",
            icon: ChartNoAxesCombined,
          },
        ]
      : []),
  ];
  function links() {
    return nav.map(({ href, label, icon: Icon }) => (
      <Link
        key={href}
        href={href}
        aria-current={
          (href === "/workspace" ? path === href : path.startsWith(href))
            ? "page"
            : undefined
        }
        onClick={() => {
          dismiss();
          if (menu.current) menu.current.open = false;
        }}
      >
        <Icon size={19} aria-hidden />
        {label}
      </Link>
    ));
  }
  return (
    <div className="ws-app">
      <a href="#workspace-content" className="ws-skip">
        Saltar para o conteúdo
      </a>
      <aside className="ws-sidebar">
        <Link href="/workspace" aria-label="SEED — painel">
          <SeedLogo compact tone="light" />
        </Link>
        <p className="ws-role">{roles[role]}</p>
        <nav aria-label={roles[role]}>{links()}</nav>
        <div className="ws-sidebar-bottom">
          <p>{data.actor.name}</p>
          <small>{data.actor.email}</small>
          <button disabled={busy} onClick={() => void run("logout", {})}>
            <LogOut size={17} aria-hidden />
            Terminar sessão
          </button>
        </div>
      </aside>
      <div className="ws-body">
        <header className="ws-topbar">
          <details className="ws-mobile-menu" ref={menu}>
            <summary aria-label="Abrir navegação">
              <Menu size={22} aria-hidden />
              <span>Menu</span>
            </summary>
            <nav aria-label="Navegação móvel">
              {links()}
              <button disabled={busy} onClick={() => void run("logout", {})}>
                Terminar sessão
              </button>
            </nav>
          </details>
          <span className="ws-org">{data.actor.organization_name}</span>
          <Link className="ws-demo" href="/workspace/about">
            <Info size={15} aria-hidden />
            <span>Demonstração</span>
          </Link>
        </header>
        <main id="workspace-content" tabIndex={-1} className="ws-main">
          {notice && notice.path === path && (
            <div
              className={"ws-notice" + (notice.error ? " ws-notice-error" : "")}
              role={notice.error ? "alert" : "status"}
            >
              <span>{notice.message}</span>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Fechar mensagem"
              >
                <X size={18} aria-hidden />
              </button>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
