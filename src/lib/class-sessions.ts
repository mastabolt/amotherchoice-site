import { getDb } from "@/lib/db";

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
    startDate: new Date(String(row.startDate ?? row.startdate)),
    endDate: new Date(String(row.endDate ?? row.enddate)),
    durationDays: Number(row.durationDays ?? row.durationdays),
    price: Number(row.price),
    capacity: Number(row.capacity),
    status: String(row.status),
    createdAt: new Date(String(row.createdAt ?? row.createdat)),
    updatedAt: new Date(String(row.updatedAt ?? row.updatedat)),
  };
}

export async function getClassSessions(): Promise<ClassSessionRecord[]> {
  const db = getDb();
  const result = await db.query(`
    SELECT
      id,
      title,
      description,
      "startDate" AS "startDate",
      "endDate" AS "endDate",
      "durationDays" AS "durationDays",
      price,
      capacity,
      status,
      "createdAt" AS "createdAt",
      "updatedAt" AS "updatedAt"
    FROM "ClassSession"
    ORDER BY "startDate" ASC
  `);

  return result.rows.map(mapRow);
}

export async function getClassSessionById(id: string): Promise<ClassSessionRecord | null> {
  const db = getDb();
  const result = await db.query(
    `
      SELECT
        id,
        title,
        description,
        "startDate" AS "startDate",
        "endDate" AS "endDate",
        "durationDays" AS "durationDays",
        price,
        capacity,
        status,
        "createdAt" AS "createdAt",
        "updatedAt" AS "updatedAt"
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
