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
  ReadOnlyNote,
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
          description="Fica privado até conceder acesso."
          trail={[{ href: "/workspace/documents", label: "Documentos" }]}
        />
        <ActionForm
          action="upload"
          multipart
          to={(r) => "/workspace/documents/" + r.id}
          cancel="/workspace/documents"
          label="Anexar documento"
          next="Depois de anexar, escolha quem pode descarregar o documento."
          success="Documento anexado. Está privado até conceder acesso."
        >
          <div className="ws-field">
            <label htmlFor="upload-file">Ficheiro</label>
            <input
              id="upload-file"
              type="file"
              name="file"
              accept=".pdf,.txt"
              required
              aria-describedby="upload-hint"
            />
            <span id="upload-hint" className="ws-hint">
              PDF ou TXT (UTF-8), até 2 MiB. Use apenas documentos fictícios.
            </span>
          </div>
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
              ? "Guarde documentos e escolha quem os pode ver."
              : "Documentos partilhados com a sua organização."
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
            owned ? "Ainda não há documentos" : "Sem documentos partilhados"
          }
          action={
            owned ? (
              <ActionLink href="/workspace/documents/new">
                Anexar documento
              </ActionLink>
            ) : undefined
          }
          search="Pesquisar documentos"
          description={
            owned
              ? "Anexe o primeiro documento."
              : "Aparecem aqui quando uma startup lhe der acesso."
          }
        />
      </>
    );
  const d = data.documents.find((d) => d.id === id);
  if (!d) return <NotAvailable />;
  const base = "/workspace/documents/" + id;
  const listCrumb = { href: "/workspace/documents", label: "Documentos" };
  const recordCrumb = { href: base, label: d.name };
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
          trail={[listCrumb, recordCrumb]}
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
                      void run(
                        "grant",
                        {
                          documentId: id,
                          organizationId: g.organization_id,
                          allow: false,
                        },
                        undefined,
                        "Acesso revogado.",
                      )
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
            next="A organização escolhida passa a poder descarregar o documento."
            success="Acesso concedido."
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
              Revogar impede novas descargas, mas não apaga cópias já
              descarregadas.
            </p>
          </ActionForm>
        ) : !recipients.length ? (
          <Empty
            title="Sem destinatários associados"
            description="Associe primeiro um investidor a uma ronda."
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
          trail={[listCrumb, recordCrumb]}
        />
        <div className="ws-panel ws-form">
          <h2>{d.name}</h2>
          <p>
            O ficheiro e os acessos concedidos serão eliminados. Esta ação não
            pode ser desfeita.
          </p>
          <p className="ws-note">
            {(() => {
              const n = data.grants.filter((g) => g.document_id === id).length;
              return n
                ? `${n} ${n === 1 ? "organização deixa" : "organizações deixam"} de poder descarregar este documento.`
                : "Nenhuma organização tem acesso a este documento.";
            })()}
          </p>
          <div className="ws-form-actions">
            <button
              disabled={busy}
              className="ws-button ws-danger"
              onClick={() =>
                void run(
                  "deleteDocument",
                  { id },
                  "/workspace/documents",
                  "Documento eliminado.",
                )
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
        trail={[listCrumb]}
        action={
          <a className="ws-button" href={"/api/capture/document/" + id}>
            Descarregar
          </a>
        }
      />
      {!d.owned && (
        <ReadOnlyNote>
          Partilhado pela startup. Pode descarregar, mas não alterar.
        </ReadOnlyNote>
      )}
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
                  : "Privado"
                : "Autorizado para a sua organização"}
            </dd>
          </div>
        </dl>
        {d.owned && (
          <div className="ws-subtle-actions">
            <ActionLink href={base + "/access"} secondary>
              Gerir acessos
            </ActionLink>
            <ActionLink href={base + "/delete"} danger>
              Eliminar documento
            </ActionLink>
          </div>
        )}
      </div>
    </>
  );
}
