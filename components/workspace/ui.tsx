"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FolderOpen } from "lucide-react";
import { useState, type ReactNode, type FormEvent } from "react";
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
export function PageHeading({
  title,
  description,
  back,
  action,
}: {
  title: string;
  description?: string;
  back?: { href: string; label: string };
  action?: ReactNode;
}) {
  return (
    <>
      <nav aria-label="Regressar" className="ws-back">
        {back && (
          <Link href={back.href}>
            <ArrowLeft size={16} aria-hidden />
            {back.label}
          </Link>
        )}
      </nav>
      <header className="ws-heading">
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
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
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      className={secondary ? "ws-button ws-secondary" : "ws-button"}
      href={href}
    >
      {children}
    </Link>
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
        title="Este recurso não está disponível para a sua conta."
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
}: {
  label: string;
  name: string;
  type?: string;
  value?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <label className="ws-field">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={value}
        required={required}
        maxLength={maxLength}
        step={type === "number" ? "0.01" : undefined}
        min={type === "number" ? "0.01" : undefined}
      />
    </label>
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
}: {
  label: string;
  name: string;
  value?: string;
  children: ReactNode;
}) {
  return (
    <label className="ws-field">
      {label}
      <select name={name} defaultValue={value} required>
        {children}
      </select>
    </label>
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
}: {
  action: string;
  extra?: Record<string, unknown>;
  transform?: (v: Record<string, unknown>) => Record<string, unknown>;
  to?: Destination;
  cancel: string;
  label: string;
  children: ReactNode;
  multipart?: boolean;
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
      );
    } catch {
      setError("Verifique os campos antes de continuar.");
    }
  }
  return (
    <form onSubmit={submit} className="ws-form ws-panel">
      {children}
      {error && <p role="alert">{error}</p>}
      <div className="ws-form-actions">
        <button className="ws-button" disabled={busy}>
          {busy ? "A guardar…" : label}
        </button>
        <Link href={cancel} className="ws-text-link">
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
