import { getDb } from "@/lib/db";

export type RegistrationRecord = {
  id: string;
  classSessionId: string;
  attendeeName: string;
  email: string;
  phone: string;
  notes: string | null;
  paymentStatus: string;
  registrationStatus: string;
  stripeCheckoutSessionId: string | null;
  stripePaymentIntentId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

function mapDate(value: unknown) {
  if (value instanceof Date) {
    return value;
  }

  return new Date(String(value));
}

function mapRegistrationRow(row: Record<string, unknown>): RegistrationRecord {
  return {
    id: String(row.id),
    classSessionId: String(row.classSessionId ?? row.classsessionid),
    attendeeName: String(row.attendeeName ?? row.attendeename),
    email: String(row.email),
    phone: String(row.phone),
    notes: row.notes == null ? null : String(row.notes),
    paymentStatus: String(row.paymentStatus ?? row.paymentstatus),
    registrationStatus: String(row.registrationStatus ?? row.registrationstatus),
    stripeCheckoutSessionId:
      row.stripeCheckoutSessionId == null && row.stripecheckoutsessionid == null
        ? null
        : String(row.stripeCheckoutSessionId ?? row.stripecheckoutsessionid),
    stripePaymentIntentId:
      row.stripePaymentIntentId == null && row.stripepaymentintentid == null
        ? null
        : String(row.stripePaymentIntentId ?? row.stripepaymentintentid),
    createdAt: mapDate(row.createdAt ?? row.createdat),
    updatedAt: mapDate(row.updatedAt ?? row.updatedat),
  };
}

export async function createPendingRegistration(input: {
  classSessionId: string;
  attendeeName: string;
  email: string;
  phone: string;
  notes?: string | null;
}) {
  const db = getDb();
  const result = await db.query(
    `
      INSERT INTO "Registration" (
        "classSessionId",
        "attendeeName",
        email,
        phone,
        notes,
        "paymentStatus",
        "registrationStatus",
        "createdAt",
        "updatedAt"
      )
      VALUES ($1, $2, $3, $4, $5, 'pending', 'active', NOW(), NOW())
      RETURNING
        id,
        "classSessionId" AS "classSessionId",
        "attendeeName" AS "attendeeName",
        email,
        phone,
        notes,
        "paymentStatus" AS "paymentStatus",
        "registrationStatus" AS "registrationStatus",
        "stripeCheckoutSessionId" AS "stripeCheckoutSessionId",
        "stripePaymentIntentId" AS "stripePaymentIntentId",
        "createdAt" AS "createdAt",
        "updatedAt" AS "updatedAt"
    `,
    [input.classSessionId, input.attendeeName, input.email, input.phone, input.notes ?? null],
  );

  return mapRegistrationRow(result.rows[0]);
}

export async function attachCheckoutSessionToRegistration(registrationId: string, checkoutSessionId: string) {
  const db = getDb();
  await db.query(
    `
      UPDATE "Registration"
      SET "stripeCheckoutSessionId" = $2,
          "updatedAt" = NOW()
      WHERE id = $1
    `,
    [registrationId, checkoutSessionId],
  );
}

export async function markRegistrationPaid(input: {
  registrationId: string;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId?: string | null;
}) {
  const db = getDb();
  await db.query(
    `
      UPDATE "Registration"
      SET "paymentStatus" = 'paid',
          "stripeCheckoutSessionId" = $2,
          "stripePaymentIntentId" = $3,
          "updatedAt" = NOW()
      WHERE id = $1
    `,
    [input.registrationId, input.stripeCheckoutSessionId, input.stripePaymentIntentId ?? null],
  );
}

export async function markRegistrationPaymentFailed(input: {
  registrationId: string;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId?: string | null;
}) {
  const db = getDb();
  await db.query(
    `
      UPDATE "Registration"
      SET "paymentStatus" = 'failed',
          "stripeCheckoutSessionId" = $2,
          "stripePaymentIntentId" = $3,
          "updatedAt" = NOW()
      WHERE id = $1
    `,
    [input.registrationId, input.stripeCheckoutSessionId, input.stripePaymentIntentId ?? null],
  );
}

export async function getRegistrationById(id: string) {
  const db = getDb();
  const result = await db.query(
    `
      SELECT
        id,
        "classSessionId" AS "classSessionId",
        "attendeeName" AS "attendeeName",
        email,
        phone,
        notes,
        "paymentStatus" AS "paymentStatus",
        "registrationStatus" AS "registrationStatus",
        "stripeCheckoutSessionId" AS "stripeCheckoutSessionId",
        "stripePaymentIntentId" AS "stripePaymentIntentId",
        "createdAt" AS "createdAt",
        "updatedAt" AS "updatedAt"
      FROM "Registration"
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapRegistrationRow(result.rows[0]);
}
