"use client";
import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { WorkspaceState } from "@/lib/server/capture";
export type Destination = string | ((result: { id?: string }) => string);
type Value = {
  data: WorkspaceState;
  busy: boolean;
  notice: { message: string; error: boolean; path: string } | null;
  dismiss: () => void;
  run: (action: string, payload: unknown, to?: Destination) => Promise<boolean>;
  refresh: () => Promise<void>;
};
const Context = createContext<Value | null>(null);
export function WorkspaceProvider({
  initial,
  children,
}: {
  initial: WorkspaceState;
  children: ReactNode;
}) {
  const [data, setData] = useState(initial),
    [busy, setBusy] = useState(false),
    [notice, setNotice] = useState<Value["notice"]>(null);
  const working = useRef(false);
  const router = useRouter(),
    path = usePathname();
  async function refresh() {
    const r = await fetch("/api/capture", { cache: "no-store" });
    if (r.status === 401) {
      router.replace("/login");
      throw new Error("A sessão expirou. Inicie sessão novamente.");
    }
    const body = await r.json();
    if (!r.ok) throw new Error(body.error);
    setData(body);
  }
  async function run(action: string, payload: unknown, to?: Destination) {
    if (working.current) return false;
    working.current = true;
    setBusy(true);
    setNotice(null);
    try {
      const r = await fetch("/api/capture/" + action, {
        method: "POST",
        headers:
          payload instanceof FormData
            ? {}
            : { "Content-Type": "application/json" },
        body: payload instanceof FormData ? payload : JSON.stringify(payload),
      });
      const result = await r.json();
      if (r.status === 401) {
        router.replace("/login");
        return false;
      }
      if (!r.ok) throw new Error(result.error);
      if (action === "logout") {
        window.location.assign("/login");
        return true;
      }
      await refresh();
      const next = typeof to === "function" ? to(result) : to;
      setNotice({
        message: "Alteração guardada.",
        error: false,
        path: next ?? path,
      });
      if (next) router.push(next);
      return true;
    } catch (e) {
      setNotice({
        message:
          e instanceof Error
            ? e.message
            : "Não foi possível guardar. Tente novamente.",
        error: true,
        path,
      });
      return false;
    } finally {
      working.current = false;
      setBusy(false);
    }
  }
  return (
    <Context.Provider
      value={{
        data,
        busy,
        notice,
        dismiss: () => setNotice(null),
        run,
        refresh,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useWorkspace() {
  const value = useContext(Context);
  if (!value) throw new Error("WorkspaceProvider em falta");
  return value;
}
