"use client";
import { useWorkspace } from "./context";
import { PageHeading, NotAvailable } from "./ui";
import { RoundsScreen } from "./rounds";
import { OpportunitiesScreen } from "./opportunities";
import { DocumentsScreen } from "./documents";
import { ProfileScreen, StartupsScreen } from "./profiles";
import { MetricsScreen } from "./metrics";
export function WorkspaceScreen({
  path,
  roundId,
  startupId,
}: {
  path: string[];
  roundId?: string;
  startupId?: string;
}) {
  const { data } = useWorkspace();
  const [section, id, mode, ...rest] = path;
  if (rest.length) return <NotAvailable />;
  if (section === "rounds")
    return <RoundsScreen id={id} mode={mode} startupId={startupId} />;
  if (section === "opportunities")
    return <OpportunitiesScreen id={id} mode={mode} roundId={roundId} />;
  if (section === "documents") return <DocumentsScreen id={id} mode={mode} />;
  if (section === "metrics" && !mode) return <MetricsScreen id={id} />;
  if (section === "profile" && (!id || id === "edit") && !mode)
    return <ProfileScreen own edit={id === "edit"} />;
  if (section === "startups" && data.actor.kind === "accelerator" && !mode)
    return id ? <ProfileScreen id={id} /> : <StartupsScreen />;
  if (section === "about" && !id)
    return (
      <>
        <PageHeading
          title="Sobre esta demonstração"
          description="SEED · captação pós-aceleração"
        />
        <div className="ws-panel max-w-2xl space-y-5">
          <p>
            As contas e os dados de exemplo são fictícios. A aplicação organiza
            rondas, negociações e documentos; não recebe nem transfere fundos.
          </p>
          <p>
            Um soft commit é uma intenção. O estado de um term sheet é um
            registo manual, sem assinatura eletrónica integrada.
          </p>
          <p>
            Os horários são apresentados em Africa/Luanda. Nos formulários, a
            data e hora usam o fuso do dispositivo.
          </p>
          <p>
            Startups gerem os seus próprios recursos. Investidores consultam as
            suas relações; aceleradoras acompanham startups vinculadas. Os
            documentos exigem autorização explícita.
          </p>
        </div>
      </>
    );
  return <NotAvailable />;
}
