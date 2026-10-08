import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authenticate, AppError } from "@/lib/server/auth";
import { state } from "@/lib/server/capture";
import { WorkspaceProvider } from "@/components/workspace/context";
import { WorkspaceShell } from "@/components/workspace/shell";
import "./workspace.css";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initial;
  try {
    const actor = await authenticate(
      (await cookies()).get("seed_session")?.value,
    );
    initial = await state(actor);
  } catch (e) {
    if (e instanceof AppError && e.status === 401) redirect("/login");
    return (
      <main className="mx-auto max-w-lg p-10">
        <h1 className="text-2xl font-bold">
          Serviço temporariamente indisponível
        </h1>
        <p className="my-5">
          Não foi possível carregar a sua área. Os seus dados permanecem
          guardados.
        </p>
        <Link href="/workspace" className="underline">
          Voltar a tentar
        </Link>
      </main>
    );
  }
  return (
    <WorkspaceProvider initial={initial}>
      <WorkspaceShell>{children}</WorkspaceShell>
    </WorkspaceProvider>
  );
}
