import { Pool } from "pg";

const globalForDb = globalThis as unknown as {
  pgPool?: Pool;
};

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required");
  }

  return new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
}

export const db = globalForDb.pgPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.pgPool = db;
}
