import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
let credentials: Record<string, string>;
test.beforeAll(async () => {
  credentials = JSON.parse(
    await readFile(".local/demo-credentials.json", "utf8"),
  );
});
async function login(page: Page, email: string) {
  await page.goto("/login");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page
    .getByLabel("Palavra-passe", { exact: true })
    .fill(credentials[email]);
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(page).toHaveURL(/\/workspace$/);
}
async function accessible(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}

test("Startup: fluxo completo em páginas dedicadas, com contexto e persistência", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await login(page, "fundador@demo.seed.local");
  await expect(
    page.getByRole("heading", { name: "A sua captação" }),
  ).toBeVisible();
  expect(await page.locator("main form").count()).toBe(0);
  await accessible(page);
  await page.screenshot({
    path: "docs/verification/ui-startup-desktop.png",
    fullPage: true,
  });
  await page
    .getByRole("link", { name: "Abrir ronda", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/rounds\/new$/);
  await expect(page.locator("main form")).toHaveCount(1);
  const roundName = "Ronda de interface " + Date.now();
  await page.getByLabel("Nome da ronda").fill(roundName);
  await page.getByLabel("Meta de captação").fill("200000.25");
  await accessible(page);
  await page.screenshot({
    path: "docs/verification/ui-round-form.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Abrir ronda", exact: true }).click();
  await expect(page).toHaveURL(/rounds\/[0-9a-f-]+$/);
  const roundURL = page.url();
  await page
    .getByRole("link", { name: "Associar investidor", exact: true })
    .click();
  await expect(page).toHaveURL(/opportunities\/new\?round=/);
  await page
    .getByLabel("Potencial investidor")
    .selectOption({ label: "Investidor Exemplo — demonstração" });
  await page
    .getByLabel("Próximo passo")
    .fill("Preparar reunião de apresentação");
  await page
    .getByRole("button", { name: "Associar investidor", exact: true })
    .click();
  await expect(page).toHaveURL(/opportunities\/[0-9a-f-]+$/);
  const opportunityURL = page.url();
  await expect(
    page.getByText("Preparar reunião de apresentação"),
  ).toBeVisible();
  expect(await page.locator("main form").count()).toBe(0);
  await page.getByRole("link", { name: "Interações", exact: true }).click();
  await page
    .getByRole("link", { name: "Registar interação", exact: true })
    .click();
  await page
    .getByLabel("Data e hora", { exact: true })
    .fill("2026-10-01T10:00");
  await page
    .getByLabel("Descrição", { exact: true })
    .fill("Reunião fictícia para validar a interface por tarefa.");
  await page
    .getByRole("button", { name: "Registar interação", exact: true })
    .click();
  await expect(page).toHaveURL(/\/interactions$/);
  await expect(
    page.getByText("Reunião fictícia para validar a interface por tarefa."),
  ).toBeVisible();
  await page.getByRole("link", { name: "Resumo", exact: true }).click();
  await page
    .getByRole("link", { name: "Atualizar negociação", exact: true })
    .click();
  await page
    .getByRole("combobox", { name: "Etapa", exact: true })
    .selectOption("meeting");
  await page.getByRole("button", { name: "Guardar negociação" }).click();
  await expect(page).toHaveURL(opportunityURL);
  await page
    .getByRole("link", { name: "Atualizar negociação", exact: true })
    .click();
  await page
    .getByRole("combobox", { name: "Etapa", exact: true })
    .selectOption("soft_commit");
  await page.getByLabel("Valor da intenção (AOA)").fill("50000");
  await page.getByRole("button", { name: "Guardar negociação" }).click();
  await expect(page).toHaveURL(opportunityURL);
  await page.reload();
  await expect(page.getByText("Soft commit", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Histórico", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Reunião → Soft commit" }),
  ).toBeVisible();
  await page.goto(roundURL);
  await page.getByRole("link", { name: "Consultar indicadores" }).click();
  await expect(page.getByRole("definition").filter({hasText: /^100\.0%/})).toBeVisible();
  await expect(page.getByText("1 de 1 negociações com reunião")).toBeVisible();
  await accessible(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await accessible(page);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page
    .getByRole("navigation", { name: "Área da startup" })
    .getByRole("link", { name: "Documentos", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Anexar documento", exact: true })
    .click();
  await page.getByLabel("Ficheiro", { exact: true }).setInputFiles({
    name: "Interface demonstração.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Documento fictício da interface."),
  });
  await page
    .getByRole("button", { name: "Anexar documento", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Interface demonstração.txt" }),
  ).toBeVisible();
  const documentURL = page.url();
  await page.getByRole("link", { name: "Gerir acessos", exact: true }).click();
  await page
    .getByRole("combobox", { name: "Organização", exact: true })
    .selectOption({ label: "Investidor Exemplo — demonstração" });
  await page.getByRole("button", { name: "Conceder acesso" }).click();
  await expect(
    page.getByRole("button", { name: "Revogar acesso" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Revogar acesso" }).click();
  await expect(
    page.getByText("Apenas a sua startup pode aceder a este documento."),
  ).toBeVisible();
  await page.goto(documentURL);
  await page
    .getByRole("link", { name: "Eliminar documento", exact: true })
    .click();
  await expect(
    page.getByText("Esta ação não pode ser desfeita.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Cancelar", exact: true }).click();
  await expect(page).toHaveURL(documentURL);
  await page
    .getByRole("link", { name: "Eliminar documento", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Eliminar documento", exact: true })
    .click();
  await expect(page).toHaveURL(/\/documents$/);
  await page.goto("/workspace/rounds");
  expect(await page.locator("main .ws-row").count()).toBeLessThanOrEqual(8);
  const next = page.getByRole("button", { name: "Seguinte", exact: true });
  if (await next.count()) {
    await next.click();
    await expect(page.getByText(/Página 2 de/)).toBeVisible();
  }
  await page.getByRole("searchbox").fill(roundName);
  await expect(page.locator("main .ws-row")).toHaveCount(1);
  await page.locator("main .ws-row").click();
  await expect(page).toHaveURL(roundURL);
  await page.goto("/");
  await expect(page).toHaveURL(/\/workspace$/);
  await expect(
    page.getByRole("heading", { name: "A sua captação" }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await accessible(page);
  await page.screenshot({
    path: "docs/verification/ui-startup-mobile.png",
    fullPage: true,
  });
  await page.getByText("Menu", { exact: true }).click();
  const nav = page.getByRole("navigation", { name: "Navegação móvel" });
  await expect(nav).toBeVisible();
  await nav.getByRole("link", { name: "Meu perfil" }).click();
  await expect(
    page.getByRole("heading", { name: "Meu perfil", exact: true }),
  ).toBeVisible();
  await expect(nav).toBeHidden();
  await page.getByRole("link", { name: "Editar perfil" }).click();
  await expect(page.locator("main form")).toHaveCount(1);
  await accessible(page);
  await page.getByRole("link", { name: "Cancelar", exact: true }).click();
  await expect(page).toHaveURL(/\/profile$/);
  await expect(page.locator("main form")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Meu perfil", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => document.activeElement?.tagName)).not.toBe(
    "BODY",
  );
});
for (const profile of [
  {
    email: "investidor@demo.seed.local",
    title: "As suas oportunidades",
    name: "investor",
    section: "Oportunidades",
  },
  {
    email: "aceleradora@demo.seed.local",
    title: "Startups em acompanhamento",
    name: "accelerator",
    section: "Startups",
  },
]) {
  test(`${profile.name}: painel próprio, navegação móvel e ações restritas`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await login(page, profile.email);
    await expect(
      page.getByRole("heading", { name: profile.title }),
    ).toBeVisible();
    await expect(page.locator("main form")).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: "Abrir ronda", exact: true }),
    ).toHaveCount(0);
    await accessible(page);
    await page.screenshot({
      path: `docs/verification/ui-${profile.name}-desktop.png`,
      fullPage: true,
    });
    await page.goto("/");
    await expect(page).toHaveURL(/\/workspace$/);
    await expect(
      page.getByRole("heading", { name: profile.title }),
    ).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
    await accessible(page);
    await page.screenshot({
      path: `docs/verification/ui-${profile.name}-mobile.png`,
      fullPage: true,
    });
    await page.getByText("Menu", { exact: true }).click();
    await page
      .getByRole("navigation", { name: "Navegação móvel" })
      .getByRole("link", { name: profile.section, exact: true })
      .click();
    await expect(
      page.getByRole("heading", {
        name:
          profile.name === "investor"
            ? "Oportunidades"
            : "Startups acompanhadas",
        exact: true,
      }),
    ).toBeVisible();
    await accessible(page);
    const rows = page.locator("main .ws-row");
    if (await rows.count()) {
      await rows.first().click();
      await expect(page.locator("main form")).toHaveCount(0);
      await accessible(page);
    }
    await page.goto("/workspace/rounds/new");
    await expect(
      page.getByRole("heading", { name: "Página indisponível" }),
    ).toBeVisible();
    await page.goto("/workspace/documents/new");
    await expect(
      page.getByRole("heading", { name: "Página indisponível" }),
    ).toBeVisible();
    await page.goto("/workspace/profile/edit");
    await expect(
      page.getByRole("heading", { name: "Página indisponível" }),
    ).toBeVisible();
    await page.getByText("Menu", { exact: true }).click();
    await page
      .getByRole("navigation", { name: "Navegação móvel" })
      .getByRole("button", { name: "Terminar sessão" })
      .click();
    await expect(page).toHaveURL(/\/login$/);
    await page.goto("/workspace");
    await expect(page).toHaveURL(/\/login$/);
  });
}
