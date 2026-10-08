import pg from "pg";
const globalDb = globalThis as unknown as { seedPool?: pg.Pool };
export const pool =
  globalDb.seedPool ??
  new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 10000,
    options: "-c timezone=UTC -c statement_timeout=10000",
  });
globalDb.seedPool = pool;
pool.on("error", () => console.error("Database connection unavailable"));
export async function transaction<T>(
  work: (db: pg.PoolClient) => Promise<T>,
): Promise<T> {
  const db = await pool.connect();
  try {
    await db.query("BEGIN");
    const result = await work(db);
    await db.query("COMMIT");
    return result;
  } catch (e) {
    await db.query("ROLLBACK");
    throw e;
  } finally {
    db.release();
  }
}
