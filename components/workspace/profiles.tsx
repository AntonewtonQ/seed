"use client";
import { useWorkspace } from "./context";
import { Collection } from "./collection";
import {
  PageHeading,
  ActionLink,
  ActionForm,
  Field,
  Textarea,
  NotAvailable,
  Badge,
} from "./ui";
export function ProfileScreen({
  id,
  edit = false,
  own = false,
}: {
  id?: string;
  edit?: boolean;
  own?: boolean;
}) {
  const { data } = useWorkspace();
  if (own && data.actor.kind !== "startup") return <NotAvailable />;
  const s = own ? data.startups[0] : data.startups.find((s) => s.id === id);
  if (!s || (edit && !own)) return <NotAvailable />;
  if (edit)
    return (
      <>
        <PageHeading
          title="Editar perfil"
          description="Mantenha a apresentação da sua startup atualizada."
          back={{ href: "/workspace/profile", label: "Meu perfil" }}
        />
        <ActionForm
          action="profile"
          to="/workspace/profile"
          cancel="/workspace/profile"
          label="Guardar perfil"
        >
          <Field name="name" label="Nome da startup" value={s.name} />
          <Field name="sector" label="Sector" value={s.sector} />
          <Textarea
            name="description"
            label="Descrição"
            value={s.description}
            required={false}
          />
        </ActionForm>
      </>
    );
  return (
    <>
      <PageHeading
        title={own ? "Meu perfil" : s.name}
        description={
          own
            ? "A informação partilhada nas suas relações de captação."
            : s.sector
        }
        back={
          own ? undefined : { href: "/workspace/startups", label: "Startups" }
        }
        action={
          own ? (
            <ActionLink href="/workspace/profile/edit">
              Editar perfil
            </ActionLink>
          ) : (
            <ActionLink href={"/workspace/rounds?startup=" + s.id}>
              Ver rondas
            </ActionLink>
          )
        }
      />
      <div className="ws-panel">
        <dl className="ws-record">
          <div>
            <dt>Startup</dt>
            <dd>{s.name}</dd>
          </div>
          <div>
            <dt>Sector</dt>
            <dd>{s.sector || "Por preencher"}</dd>
          </div>
          <div>
            <dt>Apresentação</dt>
            <dd className="whitespace-pre-wrap">
              {s.description || "Por preencher"}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
export function StartupsScreen() {
  const { data } = useWorkspace();
  if (data.actor.kind !== "accelerator") return <NotAvailable />;
  return (
    <>
      <PageHeading
        title="Startups acompanhadas"
        description="Abra uma startup para consultar o perfil e as suas rondas."
      />
      <Collection
        items={data.startups.map((s) => ({
          id: s.id,
          title: s.name,
          description: s.sector,
          href: "/workspace/startups/" + s.id,
          meta: (
            <Badge>
              {data.rounds.filter((r) => r.startup_id === s.id).length} rondas
            </Badge>
          ),
        }))}
        empty="Sem startups vinculadas"
      />
    </>
  );
}
