import { randomUUID } from "crypto";
import { getDb } from "@/lib/db";

export type AdminRole = "super_admin" | "admin";

export type AdminUserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdByAdminId: string | null;
  createdByEmail?: string | null;
};

function mapDate(value: unknown) {
  if (value instanceof Date) {
    return value;
  }

  return new Date(String(value));
}

function mapAdminUserRow(row: Record<string, unknown>): AdminUserRecord {
  return {
    id: String(row.id),
    email: String(row.email),
    passwordHash: String(row.passwordHash ?? row.passwordhash),
    role: String(row.role) as AdminRole,
    isActive: Boolean(row.isActive ?? row.isactive),
    createdAt: mapDate(row.createdAt ?? row.createdat),
    updatedAt: mapDate(row.updatedAt ?? row.updatedat),
    createdByAdminId:
      row.createdByAdminId == null && row.createdbyadminid == null ? null : String(row.createdByAdminId ?? row.createdbyadminid),
    createdByEmail:
      row.createdByEmail == null && row.createdbyemail == null ? null : String(row.createdByEmail ?? row.createdbyemail),
  };
}

export async function getAdminUserByEmail(email: string) {
  const db = getDb();
  const result = await db.query(
    `
      SELECT
        id,
        email,
        "passwordHash" AS "passwordHash",
        role,
        "isActive" AS "isActive",
        "createdAt" AS "createdAt",
        "updatedAt" AS "updatedAt",
        "createdByAdminId" AS "createdByAdminId"
      FROM "AdminUser"
      WHERE LOWER(email) = LOWER($1)
      LIMIT 1
    `,
    [email],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapAdminUserRow(result.rows[0]);
}

export async function getAdminUserById(id: string) {
  const db = getDb();
  const result = await db.query(
    `
      SELECT
        au.id,
        au.email,
        au."passwordHash" AS "passwordHash",
        au.role,
        au."isActive" AS "isActive",
        au."createdAt" AS "createdAt",
        au."updatedAt" AS "updatedAt",
        au."createdByAdminId" AS "createdByAdminId",
        creator.email AS "createdByEmail"
      FROM "AdminUser" au
      LEFT JOIN "AdminUser" creator ON creator.id = au."createdByAdminId"
      WHERE au.id = $1
      LIMIT 1
    `,
    [id],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapAdminUserRow(result.rows[0]);
}

export async function listAdministratorUsers() {
  const db = getDb();
  const result = await db.query(`
    SELECT
      au.id,
      au.email,
      au."passwordHash" AS "passwordHash",
      au.role,
      au."isActive" AS "isActive",
      au."createdAt" AS "createdAt",
      au."updatedAt" AS "updatedAt",
      au."createdByAdminId" AS "createdByAdminId",
      creator.email AS "createdByEmail"
    FROM "AdminUser" au
    LEFT JOIN "AdminUser" creator ON creator.id = au."createdByAdminId"
    WHERE au.role = 'admin'
    ORDER BY au.email ASC
  `);

  return result.rows.map(mapAdminUserRow);
}

export async function createAdministrator(input: {
  email: string;
  passwordHash: string;
  createdByAdminId: string;
}) {
  const db = getDb();
  const result = await db.query(
    `
      INSERT INTO "AdminUser" (
        id,
        email,
        "passwordHash",
        role,
        "isActive",
        "createdAt",
        "updatedAt",
        "createdByAdminId"
      )
      VALUES ($1, LOWER($2), $3, 'admin', true, NOW(), NOW(), $4)
      RETURNING
        id,
        email,
        "passwordHash" AS "passwordHash",
        role,
        "isActive" AS "isActive",
        "createdAt" AS "createdAt",
        "updatedAt" AS "updatedAt",
        "createdByAdminId" AS "createdByAdminId"
    `,
    [randomUUID(), input.email, input.passwordHash, input.createdByAdminId],
  );

  return mapAdminUserRow(result.rows[0]);
}

export async function updateAdministrator(
  id: string,
  input: {
    email: string;
    passwordHash?: string | null;
    isActive: boolean;
  },
) {
  const db = getDb();
  const result = await db.query(
    `
      UPDATE "AdminUser"
      SET email = LOWER($2),
          "passwordHash" = COALESCE($3, "passwordHash"),
          "isActive" = $4,
          "updatedAt" = NOW()
      WHERE id = $1
        AND role = 'admin'
      RETURNING
        id,
        email,
        "passwordHash" AS "passwordHash",
        role,
        "isActive" AS "isActive",
        "createdAt" AS "createdAt",
        "updatedAt" AS "updatedAt",
        "createdByAdminId" AS "createdByAdminId"
    `,
    [id, input.email, input.passwordHash ?? null, input.isActive],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapAdminUserRow(result.rows[0]);
}

export async function createSuperAdminIfMissing(input: { email: string; passwordHash: string }) {
  const db = getDb();
  const existing = await db.query(`SELECT id FROM "AdminUser" WHERE role = 'super_admin' LIMIT 1`);

  if (existing.rows.length > 0) {
    return { created: false };
  }

  const result = await db.query(
    `
      INSERT INTO "AdminUser" (
        id,
        email,
        "passwordHash",
        role,
        "isActive",
        "createdAt",
        "updatedAt"
      )
      VALUES ($1, LOWER($2), $3, 'super_admin', true, NOW(), NOW())
      RETURNING id, email
    `,
    [randomUUID(), input.email, input.passwordHash],
  );

  return {
    created: true,
    id: String(result.rows[0].id),
    email: String(result.rows[0].email),
  };
}
