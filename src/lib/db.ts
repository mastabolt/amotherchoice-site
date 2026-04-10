import { Pool } from "pg";

const globalForDb = globalThis as unknown as {
  pgPool?: Pool;
};

export function getDb() {
  if (globalForDb.pgPool) {
    return globalForDb.pgPool;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required");
  }

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.pgPool = pool;
  }

  return pool;
}
