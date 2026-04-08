import { db } from "@/lib/db";

export type ClassSessionRecord = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  durationDays: number;
  price: number;
  capacity: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

function mapRow(row: Record<string, unknown>): ClassSessionRecord {
  return {
    id: String(row.id),
    title: String(row.title),
    description: String(row.description),
    startDate: new Date(String(row.startDate)),
    endDate: new Date(String(row.endDate)),
    durationDays: Number(row.durationDays),
    price: Number(row.price),
    capacity: Number(row.capacity),
    status: String(row.status),
    createdAt: new Date(String(row.createdAt)),
    updatedAt: new Date(String(row.updatedAt)),
  };
}

export async function getClassSessions(): Promise<ClassSessionRecord[]> {
  const result = await db.query(`
    SELECT id, title, description, "startDate", "endDate", "durationDays", price, capacity, status, "createdAt", "updatedAt"
    FROM "ClassSession"
    ORDER BY "startDate" ASC
  `);

  return result.rows.map(mapRow);
}

export async function getClassSessionById(id: string): Promise<ClassSessionRecord | null> {
  const result = await db.query(
    `
      SELECT id, title, description, "startDate", "endDate", "durationDays", price, capacity, status, "createdAt", "updatedAt"
      FROM "ClassSession"
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapRow(result.rows[0]);
}
