import {
  randomBytes,
  scryptSync,
  timingSafeEqual,
  createHash,
} from "node:crypto";
import { pool, transaction } from "./db";
export class AppError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export const digest = (s: string) =>
  createHash("sha256").update(s).digest("hex");
export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  return salt + ":" + scryptSync(password, salt, 64).toString("hex");
}
function verify(password: string, hash: string) {
  const [salt, key] = hash.split(":");
  return timingSafeEqual(
    Buffer.from(key, "hex"),
    scryptSync(password, salt, 64),
  );
}
export type Actor = {
  id: string;
  email: string;
  name: string;
  organization_id: string;
  organization_name: string;
  kind: "startup" | "investor" | "accelerator";
};
export async function authenticate(token?: string): Promise<Actor> {
  if (!token) throw new AppError(401, "Inicie sessão.");
  const { rows } = await pool.query(
    `SELECT u.id,u.email,u.name,o.id organization_id,o.name organization_name,o.kind FROM sessions s JOIN users u ON u.id=s.user_id JOIN memberships m ON m.user_id=u.id JOIN organizations o ON o.id=m.organization_id WHERE s.token_hash=$1 AND s.expires_at>now()`,
    [digest(token)],
  );
  if (!rows[0]) throw new AppError(401, "Sessão expirada.");
  return rows[0];
}
export async function login(email: string, password: string) {
  if (email.length > 254 || password.length > 200 || !email || !password)
    throw new AppError(400, "Credenciais inválidas.");
  const normalized = email.trim().toLowerCase();
  const attempts = await pool.query(
    `INSERT INTO login_attempts VALUES($1,1,now()) ON CONFLICT(email) DO UPDATE SET attempts=CASE WHEN login_attempts.window_start<now()-interval '15 minutes' THEN 1 ELSE login_attempts.attempts+1 END,window_start=CASE WHEN login_attempts.window_start<now()-interval '15 minutes' THEN now() ELSE login_attempts.window_start END RETURNING attempts`,
    [digest(normalized)],
  );
  if (attempts.rows[0].attempts > 10)
    throw new AppError(429, "Aguarde 15 minutos antes de tentar novamente.");
  const { rows } = await pool.query(
    "SELECT id,password_hash FROM users WHERE email=$1",
    [normalized],
  );
  const dummy = "00000000000000000000000000000000:" + "00".repeat(64);
  if (!verify(password, rows[0]?.password_hash ?? dummy) || !rows[0])
    throw new AppError(401, "Email ou palavra-passe incorretos.");
  const token = randomBytes(32).toString("hex");
  await transaction(async (db) => {
    await db.query("DELETE FROM login_attempts WHERE email=$1", [
      digest(normalized),
    ]);
    await db.query(
      "INSERT INTO sessions VALUES($1,$2,now()+interval '8 hours')",
      [digest(token), rows[0].id],
    );
  });
  return token;
}
