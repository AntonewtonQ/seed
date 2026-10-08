import "server-only";
import { cookies } from "next/headers";
import { ZodError } from "zod";
import { authenticate, login, digest, AppError } from "@/lib/server/auth";
import { pool } from "@/lib/server/db";
import { command, state, upload, download } from "@/lib/server/capture";
export const runtime = "nodejs";
const headers = { "Cache-Control": "no-store" };
async function handle(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  try {
    const path = (await params).path ?? [];
    const action = path[0] ?? "state";
    const jar = await cookies();
    if (request.method === "POST") {
      if (
        request.headers.get("origin") !==
        (process.env.APP_ORIGIN ?? "http://localhost:3000")
      )
        throw new AppError(403, "Origem não autorizada.");
      if (Number(request.headers.get("content-length") ?? 0) > 2200000)
        throw new AppError(413, "Pedido demasiado grande.");
      if (action === "login") {
        const body = await request.json();
        if (typeof body.email !== "string" || typeof body.password !== "string")
          throw new AppError(400, "Credenciais inválidas.");
        const token = await login(body.email, body.password);
        jar.set("seed_session", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.APP_ORIGIN?.startsWith("https:") ?? false,
          path: "/",
          maxAge: 28800,
        });
        return Response.json({ ok: true }, { headers });
      }
    }
    const actor = await authenticate(jar.get("seed_session")?.value);
    if (request.method === "GET") {
      if (action === "document" && path[1]) {
        const d = await download(actor, path[1]);
        return new Response(new Uint8Array(d.content), {
          headers: {
            ...headers,
            "Content-Type": d.media_type,
            "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(d.name)}`,
            "X-Content-Type-Options": "nosniff",
          },
        });
      }
      if (action === "state")
        return Response.json(await state(actor), { headers });
      throw new AppError(404, "Recurso não encontrado.");
    }
    if (action === "logout") {
      await pool.query("DELETE FROM sessions WHERE token_hash=$1", [
        digest(jar.get("seed_session")!.value),
      ]);
      jar.delete("seed_session");
      return Response.json({ ok: true }, { headers });
    }
    if (action === "upload") {
      const data = await request.formData();
      const file = data.get("file");
      if (!(file instanceof File))
        throw new AppError(400, "Selecione um ficheiro.");
      return Response.json(await upload(actor, file), { status: 201, headers });
    }
    return Response.json(await command(actor, action, await request.json()), {
      headers,
    });
  } catch (error) {
    if (error instanceof AppError)
      return Response.json(
        { error: error.message },
        { status: error.status, headers },
      );
    if (error instanceof ZodError || error instanceof SyntaxError)
      return Response.json(
        { error: "Dados inválidos. Verifique os campos e os formatos." },
        { status: 400, headers },
      );
    const code = (error as { code?: string })?.code;
    if (code === "23505")
      return Response.json(
        { error: "Este registo já existe." },
        { status: 409, headers },
      );
    if (code === "23503" || code === "23514")
      return Response.json(
        { error: "A operação viola uma relação ou regra de integridade." },
        { status: 400, headers },
      );
    console.error("Capture request failed", code ?? "unavailable");
    return Response.json(
      { error: "Serviço temporariamente indisponível. Tente novamente." },
      { status: 503, headers },
    );
  }
}
export const GET = handle;
export const POST = handle;
