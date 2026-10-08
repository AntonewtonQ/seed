"use client";
import { useWorkspace } from "./context";
import { Collection } from "./collection";
import {
  PageHeading,
  ActionLink,
  ActionForm,
  Select,
  Empty,
  NotAvailable,
  Badge,
  stamp,
} from "./ui";
export function DocumentsScreen({ id, mode }: { id?: string; mode?: string }) {
  const { data, run, busy } = useWorkspace();
  const owned = data.actor.kind === "startup";
  if (id === "new") {
    if (!owned) return <NotAvailable />;
    return (
      <>
        <PageHeading
          title="Anexar documento"
          description="O documento fica privado até conceder acesso."
          back={{ href: "/workspace/documents", label: "Documentos" }}
        />
        <ActionForm
          action="upload"
          multipart
          to={(r) => "/workspace/documents/" + r.id}
          cancel="/workspace/documents"
          label="Anexar documento"
        >
          <label className="ws-field">
            Ficheiro
            <input type="file" name="file" accept=".pdf,.txt" required />
          </label>
          <p className="ws-note">
            PDF ou texto UTF-8, até 2 MiB. Utilize documentos fictícios nesta
            demonstração.
          </p>
        </ActionForm>
      </>
    );
  }
  if (!id)
    return (
      <>
        <PageHeading
          title="Documentos"
          description={
            owned
              ? "Organize o data room e escolha quem pode aceder a cada ficheiro."
              : "Consulte os documentos explicitamente partilhados com a sua organização."
          }
          action={
            owned ? (
              <ActionLink href="/workspace/documents/new">
                Anexar documento
              </ActionLink>
            ) : undefined
          }
        />
        <Collection
          items={data.documents.map((d) => ({
            id: d.id,
            title: d.name,
            description: `${(d.size / 1024).toLocaleString("pt-PT", { maximumFractionDigits: 1 })} KB · ${stamp(d.created_at)}`,
            href: "/workspace/documents/" + d.id,
            meta: (
              <Badge>
                {d.owned
                  ? data.grants.some((g) => g.document_id === d.id)
                    ? "Partilhado"
                    : "Privado"
                  : "Partilhado consigo"}
              </Badge>
            ),
          }))}
          empty={
            owned ? "O data room está vazio" : "Sem documentos partilhados"
          }
          description={
            owned
              ? "Anexe o primeiro documento da sua startup."
              : "Os documentos aparecem aqui depois de a startup autorizar a sua organização."
          }
        />
      </>
    );
  const d = data.documents.find((d) => d.id === id);
  if (!d) return <NotAvailable />;
  const base = "/workspace/documents/" + id;
  if (mode === "access") {
    if (!d.owned) return <NotAvailable />;
    const s = data.startups.find((s) => s.id === d.startup_id);
    const rounds = data.rounds
      .filter((r) => r.startup_id === d.startup_id)
      .map((r) => r.id);
    const ids = data.opportunities
      .filter((p) => rounds.includes(p.round_id))
      .map((p) => p.investor_id);
    const recipients = [
      ...data.investors.filter((i) => ids.includes(i.id)),
      ...data.accelerators.filter((a) => a.id === s?.accelerator_id),
    ];
    const grants = data.grants.filter((g) => g.document_id === id);
    return (
      <>
        <PageHeading
          title="Gerir acessos"
          description={d.name}
          back={{ href: base, label: "Documento" }}
        />
        <div className="ws-panel mb-6">
          <h2>Organizações com acesso</h2>
          {grants.length ? (
            <ul className="space-y-3">
              {grants.map((g) => (
                <li
                  key={g.organization_id}
                  className="flex flex-wrap items-center justify-between gap-3"
                >
                  <span>
                    {recipients.find((r) => r.id === g.organization_id)?.name ??
                      "Organização autorizada"}
                  </span>
                  <button
                    className="ws-text-link"
                    disabled={busy}
                    onClick={() =>
                      void run("grant", {
                        documentId: id,
                        organizationId: g.organization_id,
                        allow: false,
                      })
                    }
                  >
                    Revogar acesso
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="ws-note">
              Apenas a sua startup pode aceder a este documento.
            </p>
          )}
        </div>
        {recipients.some(
          (r) => !grants.some((g) => g.organization_id === r.id),
        ) ? (
          <ActionForm
            action="grant"
            extra={{ documentId: id, allow: true }}
            to={base + "/access"}
            cancel={base}
            label="Conceder acesso"
          >
            <Select label="Organização" name="organizationId">
              {recipients
                .filter((r) => !grants.some((g) => g.organization_id === r.id))
                .map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
            </Select>
            <p className="ws-note">
              A autorização permite novas descargas. A revogação não remove
              cópias já descarregadas.
            </p>
          </ActionForm>
        ) : !recipients.length ? (
          <Empty
            title="Sem destinatários associados"
            description="Associe um investidor a uma ronda antes de lhe conceder acesso."
            action={
              <ActionLink href="/workspace/opportunities/new">
                Associar investidor
              </ActionLink>
            }
          />
        ) : null}
      </>
    );
  }
  if (mode === "delete") {
    if (!d.owned) return <NotAvailable />;
    return (
      <>
        <PageHeading
          title="Eliminar documento"
          back={{ href: base, label: "Documento" }}
        />
        <div className="ws-panel ws-form">
          <h2>{d.name}</h2>
          <p>
            O ficheiro e as respetivas autorizações serão eliminados. Esta ação
            não pode ser desfeita.
          </p>
          <div className="ws-form-actions">
            <button
              disabled={busy}
              className="ws-button ws-danger"
              onClick={() =>
                void run("deleteDocument", { id }, "/workspace/documents")
              }
            >
              Eliminar documento
            </button>
            <ActionLink href={base} secondary>
              Cancelar
            </ActionLink>
          </div>
        </div>
      </>
    );
  }
  if (mode) return <NotAvailable />;
  return (
    <>
      <PageHeading
        title={d.name}
        back={{ href: "/workspace/documents", label: "Documentos" }}
        action={
          <a className="ws-button" href={"/api/capture/document/" + id}>
            Descarregar documento
          </a>
        }
      />
      <div className="ws-panel">
        <dl className="ws-record ws-record-grid">
          <div>
            <dt>Adicionado em</dt>
            <dd>{stamp(d.created_at)}</dd>
          </div>
          <div>
            <dt>Tamanho</dt>
            <dd>
              {(d.size / 1024).toLocaleString("pt-PT", {
                maximumFractionDigits: 1,
              })}{" "}
              KB
            </dd>
          </div>
          <div>
            <dt>Acesso</dt>
            <dd>
              {d.owned
                ? data.grants.some((g) => g.document_id === id)
                  ? "Partilhado com organizações autorizadas"
                  : "Privado — apenas a sua startup"
                : "Autorizado para a sua organização"}
            </dd>
          </div>
        </dl>
        {d.owned && (
          <div className="ws-subtle-actions">
            <ActionLink href={base + "/access"} secondary>
              Gerir acessos
            </ActionLink>
            <ActionLink href={base + "/delete"} secondary>
              Eliminar documento
            </ActionLink>
          </div>
        )}
      </div>
    </>
  );
}
