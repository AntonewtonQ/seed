"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, FolderOpen } from "lucide-react";
import { useId, useState, type ReactNode, type FormEvent } from "react";
import { useWorkspace, type Destination } from "./context";
export const stages: Record<string, string> = {
  contacted: "Contactado",
  meeting: "Reunião",
  soft_commit: "Soft commit",
  term_sheet: "Term sheet",
  closed: "Encerrada",
  declined: "Recusada",
};
export const terms: Record<string, string> = {
  none: "Sem term sheet",
  received: "Recebido",
  review: "Em análise",
  accepted: "Aceite",
  rejected: "Rejeitado",
};
export const stamp = (value: string | Date) =>
  new Date(value).toLocaleString("pt-PT", {
    timeZone: "Africa/Luanda",
    dateStyle: "medium",
    timeStyle: "short",
  });
export const money = (value: string, currency: string) =>
  `${Number(value).toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
export type Crumb = { href: string; label: string };
// trail: níveis acima da página atual, do mais geral para o mais próximo.
// Em telemóvel, só o nível imediatamente acima fica visível, como "voltar".
export function PageHeading({
  title,
  description,
  trail = [],
  action,
}: {
  title: string;
  description?: ReactNode;
  trail?: Crumb[];
  action?: ReactNode;
}) {
  return (
    <>
      <nav aria-label="Localização" className="ws-back">
        {trail.length > 0 && (
          <ol>
            {trail.map((c, i) => (
              <li
                key={c.href}
                className={i === trail.length - 1 ? "ws-crumb-parent" : undefined}
              >
                <Link href={c.href}>
                  {i === trail.length - 1 && (
                    <ArrowLeft size={16} aria-hidden className="ws-crumb-icon" />
                  )}
                  {c.label}
                </Link>
              </li>
            ))}
            <li className="ws-crumb-current" aria-current="page">
              {title}
            </li>
          </ol>
        )}
      </nav>
      <header className="ws-heading">
        <div>
          <h1>{title}</h1>
          {description && <div className="ws-heading-description">{description}</div>}
        </div>
        {action}
      </header>
    </>
  );
}
export function ActionLink({
  href,
  children,
  secondary = false,
  danger = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  danger?: boolean;
}) {
  return (
    <Link
      className={
        "ws-button" +
        (danger ? " ws-danger-outline" : secondary ? " ws-secondary" : "")
      }
      href={href}
    >
      {children}
    </Link>
  );
}
// Indica aos perfis sem escrita que a ausência de ações é intencional.
export function ReadOnlyNote({ children }: { children: ReactNode }) {
  return (
    <p className="ws-readonly">
      <Eye size={16} aria-hidden />
      <span>{children}</span>
    </p>
  );
}
export function Empty({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="ws-empty">
      <FolderOpen aria-hidden size={28} />
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}
export function NotAvailable() {
  return (
    <>
      <PageHeading title="Página indisponível" />
      <Empty
        title="Esta página não está disponível para a sua conta."
        description="Pode não existir ou não estar partilhada com a sua organização."
        action={<ActionLink href="/workspace">Voltar ao painel</ActionLink>}
      />
    </>
  );
}
export function Field({
  label,
  name,
  type = "text",
  value = "",
  required = true,
  maxLength = 160,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  value?: string;
  required?: boolean;
  maxLength?: number;
  hint?: string;
}) {
  const id = useId();
  const hintId = id + "-hint";
  return (
    <div className="ws-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={value}
        required={required}
        maxLength={maxLength}
        step={type === "number" ? "0.01" : undefined}
        min={type === "number" ? "0.01" : undefined}
        aria-describedby={hint ? hintId : undefined}
      />
      {hint && (
        <span id={hintId} className="ws-hint">
          {hint}
        </span>
      )}
    </div>
  );
}
export function Textarea({
  label,
  name,
  value = "",
  required = true,
  maxLength = 2000,
}: {
  label: string;
  name: string;
  value?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <label className="ws-field">
      {label}
      <textarea
        name={name}
        defaultValue={value}
        required={required}
        maxLength={maxLength}
        rows={4}
      />
    </label>
  );
}
export function Select({
  label,
  name,
  value,
  children,
  hint,
}: {
  label: string;
  name: string;
  value?: string;
  children: ReactNode;
  hint?: string;
}) {
  const id = useId();
  const hintId = id + "-hint";
  return (
    <div className="ws-field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        defaultValue={value}
        required
        aria-describedby={hint ? hintId : undefined}
      >
        {children}
      </select>
      {hint && (
        <span id={hintId} className="ws-hint">
          {hint}
        </span>
      )}
    </div>
  );
}
export function ActionForm({
  action,
  extra = {},
  transform,
  to,
  cancel,
  label,
  children,
  multipart = false,
  next,
  success,
}: {
  action: string;
  extra?: Record<string, unknown>;
  transform?: (v: Record<string, unknown>) => Record<string, unknown>;
  to?: Destination;
  cancel: string;
  label: string;
  children: ReactNode;
  multipart?: boolean;
  /** O que acontece depois de guardar, mostrado junto da ação principal. */
  next?: string;
  /** Mensagem mostrada no destino depois de guardar. */
  success?: string;
}) {
  const { run, busy } = useWorkspace();
  const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      const fd = new FormData(e.currentTarget);
      const values = { ...Object.fromEntries(fd), ...extra };
      void run(
        action,
        multipart ? fd : transform ? transform(values) : values,
        to,
        success,
      );
    } catch {
      setError("Verifique os campos antes de continuar.");
    }
  }
  return (
    <form onSubmit={submit} className="ws-form ws-panel">
      {children}
      {error && (
        <p role="alert" className="ws-field-error">
          {error}
        </p>
      )}
      <div className="ws-form-actions">
        {next && <p className="ws-note ws-form-next">{next}</p>}
        <button className="ws-button" disabled={busy}>
          {busy ? "A guardar…" : label}
        </button>
        <Link href={cancel} className="ws-button ws-secondary">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
export function Row({
  href,
  title,
  description,
  meta,
}: {
  href: string;
  title: string;
  description?: string;
  meta?: ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="ws-row">
        <span className="min-w-0">
          <strong>{title}</strong>
          {description && (
            <span className="ws-row-description">{description}</span>
          )}
        </span>
        <span className="ws-row-end">
          {meta}
          <ArrowRight size={17} aria-hidden />
        </span>
      </Link>
    </li>
  );
}
export function Badge({ children }: { children: ReactNode }) {
  return <span className="ws-badge">{children}</span>;
}
export function RecordTabs({
  items,
  active,
}: {
  items: { href: string; label: string }[];
  active: string;
}) {
  return (
    <nav className="ws-tabs" aria-label="Detalhes do recurso">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={active === item.href ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
export function Stat({
  label,
  value,
  detail,
}: {
  label: string;
  value: ReactNode;
  detail?: string;
}) {
  return (
    <div className="ws-stat">
      <dt>{label}</dt>
      <dd>
        {value}
        {detail && <p>{detail}</p>}
      </dd>
    </div>
  );
}
