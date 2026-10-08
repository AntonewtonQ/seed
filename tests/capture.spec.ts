import {
  test,
  expect,
  request,
  type APIRequestContext,
} from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";
const origin = process.env.TEST_ORIGIN ?? "http://localhost:3000";
let credentials: Record<string, string>;
test.beforeAll(async () => {
  credentials = JSON.parse(
    await readFile(".local/demo-credentials.json", "utf8"),
  );
});
async function account(email: string) {
  const api = await request.newContext({
    baseURL: origin,
    extraHTTPHeaders: { origin },
  });
  expect(
    (
      await api.post("/api/capture/login", {
        data: { email, password: credentials[email] },
      })
    ).status(),
  ).toBe(200);
  return api;
}
async function post(
  api: APIRequestContext,
  action: string,
  data: unknown,
  status = 200,
) {
  const r = await api.post("/api/capture/" + action, { data });
  expect(r.status(), await r.text()).toBe(status);
  return r.json();
}
test("Fluxo persistente, isolamento por recurso, indicadores e integridade", async () => {
  const owner = await account("fundador@demo.seed.local");
  const other = await account("outra@demo.seed.local");
  const investor = await account("investidor@demo.seed.local");
  const stranger = await account("outro-investidor@demo.seed.local");
  const accel = await account("aceleradora@demo.seed.local");
  const initial = await (await owner.get("/api/capture")).json();
  const inv = initial.investors.find((i: { name: string }) =>
    i.name.startsWith("Investidor Exemplo"),
  );
  const round = await post(owner, "round", {
    name: "Verificação " + Date.now(),
    target: "1000000.25",
    currency: "AOA",
  });
  let data = await (await owner.get("/api/capture")).json();
  expect(
    data.metrics.find((m: { roundId: string }) => m.roundId === round.id)
      .conversion,
  ).toBeNull();
  const opportunity = await post(owner, "opportunity", {
    roundId: round.id,
    investorId: inv.id,
    nextStep: "Reunião de demonstração",
  });
  await post(
    owner,
    "opportunity",
    { roundId: round.id, investorId: inv.id, nextStep: "" },
    409,
  );
  await post(
    other,
    "opportunity",
    { roundId: round.id, investorId: inv.id, nextStep: "" },
    400,
  );
  await post(
    other,
    "transition",
    {
      id: opportunity.id,
      stage: "meeting",
      softAmount: null,
      termStatus: "none",
      nextStep: "",
    },
    404,
  );
  await post(
    investor,
    "round",
    { name: "Não autorizado", target: "10", currency: "AOA" },
    403,
  );
  await post(owner, "interaction", {
    id: opportunity.id,
    kind: "meeting",
    body: "Reunião fictícia para verificação.",
    occurredAt: new Date().toISOString(),
  });
  await post(owner, "transition", {
    id: opportunity.id,
    stage: "meeting",
    softAmount: null,
    termStatus: "none",
    nextStep: "Aguardar intenção",
  });
  data = await (await owner.get("/api/capture")).json();
  expect(
    data.metrics.find((m: { roundId: string }) => m.roundId === round.id)
      .conversion,
  ).toBe(0);
  await post(
    owner,
    "transition",
    {
      id: opportunity.id,
      stage: "soft_commit",
      softAmount: null,
      termStatus: "none",
      nextStep: "",
    },
    400,
  );
  await post(owner, "transition", {
    id: opportunity.id,
    stage: "soft_commit",
    softAmount: "150000.50",
    termStatus: "none",
    nextStep: "Solicitar term sheet",
  });
  await post(owner, "transition", {
    id: opportunity.id,
    stage: "term_sheet",
    softAmount: "150000.50",
    termStatus: "received",
    nextStep: "Analisar termos",
  });
  data = await (await owner.get("/api/capture")).json();
  const metric = data.metrics.find(
    (m: { roundId: string }) => m.roundId === round.id,
  );
  expect(metric.conversion).toBe(100);
  expect(metric.denominator).toBe(1);
  expect(metric.daysToFirstCommit).toBeGreaterThanOrEqual(0);
  expect(
    data.rounds.find((r: { id: string }) => r.id === round.id).target,
  ).toBe("1000000.25");
  const upload = await owner.post("/api/capture/upload", {
    multipart: {
      file: {
        name: "evidencia.txt",
        mimeType: "text/plain",
        buffer: Buffer.from("Documento fictício de verificação."),
      },
    },
  });
  expect(upload.status()).toBe(201);
  const document = await upload.json();
  for (const api of [other, investor, stranger, accel])
    expect(
      (await api.get("/api/capture/document/" + document.id)).status(),
    ).toBe(404);
  await post(owner, "grant", {
    documentId: document.id,
    organizationId: inv.id,
    allow: true,
  });
  expect(
    await (await investor.get("/api/capture/document/" + document.id)).text(),
  ).toBe("Documento fictício de verificação.");
  await post(
    other,
    "grant",
    { documentId: document.id, organizationId: inv.id, allow: true },
    404,
  );
  await post(owner, "grant", {
    documentId: document.id,
    organizationId: inv.id,
    allow: false,
  });
  expect(
    (await investor.get("/api/capture/document/" + document.id)).status(),
  ).toBe(404);
  for (const api of [other, stranger]) {
    const d = await (await api.get("/api/capture")).json();
    expect(
      d.opportunities.some((p: { id: string }) => p.id === opportunity.id),
    ).toBe(false);
    expect(d.documents.some((p: { id: string }) => p.id === document.id)).toBe(
      false,
    );
  }
  expect(
    (await (await accel.get("/api/capture")).json()).opportunities.some(
      (p: { id: string }) => p.id === opportunity.id,
    ),
  ).toBe(true);
  await post(owner, "roundStatus", { id: round.id, status: "closed" });
  await post(
    owner,
    "transition",
    {
      id: opportunity.id,
      stage: "closed",
      softAmount: "150000.50",
      termStatus: "accepted",
      nextStep: "",
    },
    409,
  );
  await post(owner, "roundStatus", { id: round.id, status: "open" });
  await post(owner, "deleteDocument", { id: document.id });
  expect(
    (await owner.get("/api/capture/document/" + document.id)).status(),
  ).toBe(404);
  const kept = await owner.post("/api/capture/upload", {
    multipart: {
      file: {
        name: "persistencia.txt",
        mimeType: "text/plain",
        buffer: Buffer.from("Persistência verificada após reinício."),
      },
    },
  });
  const keptDoc = await kept.json();
  await writeFile(
    ".local/persistence-proof.json",
    JSON.stringify({
      roundId: round.id,
      opportunityId: opportunity.id,
      documentId: keptDoc.id,
    }),
  );
  await post(
    owner,
    "round",
    { name: "Valor inválido", target: "-20", currency: "AOA" },
    400,
  );
  const badFile = await owner.post("/api/capture/upload", {
    multipart: {
      file: {
        name: "script.html",
        mimeType: "text/html",
        buffer: Buffer.from("<script>alert(1)</script>"),
      },
    },
  });
  expect(badFile.status()).toBe(400);
  expect(
    (
      await owner.post("/api/capture/round", {
        headers: { origin: "https://invalid.example" },
        data: {},
      })
    ).status(),
  ).toBe(403);
  await post(owner, "logout", {});
  expect((await owner.get("/api/capture")).status()).toBe(401);
  for (const api of [owner, other, investor, stranger, accel])
    await api.dispose();
});
