import { loadEnvConfig } from "@next/env";
import { randomBytes } from "node:crypto";
import { writeFile, readFile } from "node:fs/promises";
async function main() {
  loadEnvConfig(process.cwd());
  const { pool, transaction } = await import("../lib/server/db");
  const { hashPassword } = await import("../lib/server/auth");
  const people = [
    ["startup", "fundador@demo.seed.local", "Startup Horizonte — demonstração"],
    ["startup", "outra@demo.seed.local", "Startup Isolada — demonstração"],
    [
      "investor",
      "investidor@demo.seed.local",
      "Investidor Exemplo — demonstração",
    ],
    [
      "investor",
      "outro-investidor@demo.seed.local",
      "Investidor Isolado — demonstração",
    ],
    [
      "accelerator",
      "aceleradora@demo.seed.local",
      "Aceleradora Exemplo — demonstração",
    ],
  ];
  let credentials: Record<string, string> = {};
  try {
    credentials = JSON.parse(
      await readFile(".local/demo-credentials.json", "utf8"),
    );
  } catch {}
  await transaction(async (db) => {
    for (const [kind, email, name] of people) {
      if (
        (await db.query("SELECT 1 FROM users WHERE email=$1", [email])).rowCount
      )
        continue;
      const password = randomBytes(18).toString("base64url");
      const org = (
        await db.query(
          "INSERT INTO organizations(name,kind) VALUES($1,$2) RETURNING id",
          [name, kind],
        )
      ).rows[0].id;
      const user = (
        await db.query(
          "INSERT INTO users(email,name,password_hash) VALUES($1,$2,$3) RETURNING id",
          [email, name, hashPassword(password)],
        )
      ).rows[0].id;
      await db.query("INSERT INTO memberships VALUES($1,$2)", [user, org]);
      if (kind === "startup")
        await db.query(
          "INSERT INTO startups(organization_id,sector,description) VALUES($1,$2,$3)",
          [org, "Tecnologia", "Perfil fictício para demonstração académica."],
        );
      credentials[email] = password;
    }
    const accelerator = (
      await db.query(
        "SELECT m.organization_id FROM memberships m JOIN users u ON u.id=m.user_id WHERE u.email='aceleradora@demo.seed.local'",
      )
    ).rows[0];
    await db.query(
      "UPDATE startups SET accelerator_id=$1 WHERE organization_id=(SELECT m.organization_id FROM memberships m JOIN users u ON u.id=m.user_id WHERE u.email='fundador@demo.seed.local') AND accelerator_id IS NULL",
      [accelerator.organization_id],
    );
  });
  await writeFile(
    ".local/demo-credentials.json",
    JSON.stringify(credentials, null, 2),
    { mode: 0o600 },
  );
  console.log(
    "Contas demonstrativas preparadas; credenciais em .local/demo-credentials.json (não versionado). Nenhum registo existente foi apagado.",
  );
  await pool.end();
}
main().catch(() => {
  console.error("Não foi possível preparar os dados demonstrativos.");
  process.exitCode = 1;
});
