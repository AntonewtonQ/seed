import { WorkspaceScreen } from "@/components/workspace/screens";
type Props = {
  params: Promise<{ path: string[] }>;
  searchParams: Promise<{ round?: string; startup?: string }>;
};
export async function generateMetadata({ params }: Props) {
  const { path } = await params;
  const titles: Record<string, string> = {
    rounds: "Rondas",
    opportunities: "Negociações",
    documents: "Documentos",
    profile: "Perfil",
    startups: "Startups",
    metrics: "Indicadores",
    about: "Demonstração",
  };
  return { title: (titles[path[0]] ?? "Área de trabalho") + " | SEED" };
}
export default async function Page({ params, searchParams }: Props) {
  const { path } = await params;
  const query = await searchParams;
  return (
    <WorkspaceScreen
      path={path}
      roundId={query.round}
      startupId={query.startup}
    />
  );
}
