import { randomUUID } from "crypto";
import { getDb } from "@/lib/db";

export type ClassSessionStatus = "open" | "closed";

export type ClassSessionRecord = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  durationDays: number;
  price: number;
  capacity: number;
  status: ClassSessionStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type AdminClassSessionSummary = ClassSessionRecord & {
  registrationCount: number;
  paidRegistrationCount: number;
  pendingRegistrationCount: number;
  failedRegistrationCount: number;
};

function mapDate(value: unknown) {
  if (value instanceof Date) {
    return value;
  }

  return new Date(String(value));
}

function mapRow(row: Record<string, unknown>): ClassSessionRecord {
  return {
    id: String(row.id),
    title: String(row.title),
    description: String(row.description),
    startDate: mapDate(row.startDate ?? row.startdate),
    endDate: mapDate(row.endDate ?? row.enddate),
    durationDays: Number(row.durationDays ?? row.durationdays),
    price: Number(row.price),
    capacity: Number(row.capacity),
    status: String(row.status) as ClassSessionStatus,
    createdAt: mapDate(row.createdAt ?? row.createdat),
    updatedAt: mapDate(row.updatedAt ?? row.updatedat),
  };
}

function mapAdminSummaryRow(row: Record<string, unknown>): AdminClassSessionSummary {
  return {
    ...mapRow(row),
    registrationCount: Number(row.registrationCount ?? row.registrationcount ?? 0),
    paidRegistrationCount: Number(row.paidRegistrationCount ?? row.paidregistrationcount ?? 0),
    pendingRegistrationCount: Number(row.pendingRegistrationCount ?? row.pendingregistrationcount ?? 0),
    failedRegistrationCount: Number(row.failedRegistrationCount ?? row.failedregistrationcount ?? 0),
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

export async function getAdminClassSessionSummaries(): Promise<AdminClassSessionSummary[]> {
  const db = getDb();
  const result = await db.query(`
    SELECT
      cs.id,
      cs.title,
      cs.description,
      cs."startDate" AS "startDate",
      cs."endDate" AS "endDate",
      cs."durationDays" AS "durationDays",
      cs.price,
      cs.capacity,
      cs.status,
      cs."createdAt" AS "createdAt",
      cs."updatedAt" AS "updatedAt",
      COUNT(r.id)::int AS "registrationCount",
      COUNT(*) FILTER (WHERE r."paymentStatus" = 'paid')::int AS "paidRegistrationCount",
      COUNT(*) FILTER (WHERE r."paymentStatus" = 'pending')::int AS "pendingRegistrationCount",
      COUNT(*) FILTER (WHERE r."paymentStatus" = 'failed')::int AS "failedRegistrationCount"
    FROM "ClassSession" cs
    LEFT JOIN "Registration" r ON r."classSessionId" = cs.id
    GROUP BY cs.id
    ORDER BY cs."startDate" ASC
  `);

  return result.rows.map(mapAdminSummaryRow);
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

export async function createClassSession(input: {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  durationDays: number;
  price: number;
  capacity: number;
  status: ClassSessionStatus;
}) {
  const db = getDb();
  const result = await db.query(
    `
      INSERT INTO "ClassSession" (
        id,
        title,
        description,
        "startDate",
        "endDate",
        "durationDays",
        price,
        capacity,
        status,
        "createdAt",
        "updatedAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      RETURNING
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
    `,
    [
      randomUUID(),
      input.title,
      input.description,
      input.startDate,
      input.endDate,
      input.durationDays,
      input.price,
      input.capacity,
      input.status,
    ],
  );

  return mapRow(result.rows[0]);
}

export async function updateClassSession(
  id: string,
  input: {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    durationDays: number;
    price: number;
    capacity: number;
    status: ClassSessionStatus;
  },
) {
  const db = getDb();
  const result = await db.query(
    `
      UPDATE "ClassSession"
      SET title = $2,
          description = $3,
          "startDate" = $4,
          "endDate" = $5,
          "durationDays" = $6,
          price = $7,
          capacity = $8,
          status = $9,
          "updatedAt" = NOW()
      WHERE id = $1
      RETURNING
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
    `,
    [
      id,
      input.title,
      input.description,
      input.startDate,
      input.endDate,
      input.durationDays,
      input.price,
      input.capacity,
      input.status,
    ],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapRow(result.rows[0]);
}

export async function updateClassSessionStatus(id: string, status: ClassSessionStatus) {
  const db = getDb();
  await db.query(
    `
      UPDATE "ClassSession"
      SET status = $2,
          "updatedAt" = NOW()
      WHERE id = $1
    `,
    [id, status],
  );
}

export async function deleteClassSession(id: string) {
  const db = getDb();
  await db.query(`DELETE FROM "ClassSession" WHERE id = $1`, [id]);
}
