"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  ClassSessionStatus,
  createClassSession,
  deleteClassSession,
  updateClassSession,
  updateClassSessionStatus,
} from "@/lib/class-sessions";
import { createAdministrator, updateAdministrator } from "@/lib/admin-users";
import { clearAdminSession, requireAdminSession, requireSuperAdmin } from "@/lib/admin-auth";

function parseRequiredString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${key} is required`);
  }

  return value.trim();
}

function parseDate(formData: FormData, key: string) {
  const value = parseRequiredString(formData, key);
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`${key} must be a valid date`);
  }

  return date;
}

function parseInteger(formData: FormData, key: string) {
  const value = Number.parseInt(parseRequiredString(formData, key), 10);

  if (Number.isNaN(value)) {
    throw new Error(`${key} must be a number`);
  }

  return value;
}

function parsePriceInCents(formData: FormData) {
  const raw = Number.parseFloat(parseRequiredString(formData, "price"));

  if (Number.isNaN(raw)) {
    throw new Error("price must be a valid dollar amount");
  }

  return Math.round(raw * 100);
}

function parseStatus(formData: FormData): ClassSessionStatus {
  const status = parseRequiredString(formData, "status");

  if (status !== "open" && status !== "closed") {
    throw new Error("status must be open or closed");
  }

  return status;
}

function parseBoolean(formData: FormData, key: string) {
  return formData.get(key) === "true";
}

function parseClassSessionInput(formData: FormData) {
  return {
    title: parseRequiredString(formData, "title"),
    description: parseRequiredString(formData, "description"),
    startDate: parseDate(formData, "startDate"),
    endDate: parseDate(formData, "endDate"),
    durationDays: parseInteger(formData, "durationDays"),
    price: parsePriceInCents(formData),
    capacity: parseInteger(formData, "capacity"),
    status: parseStatus(formData),
  };
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function createClassSessionAction(formData: FormData) {
  await requireAdminSession();
  const classSession = await createClassSession(parseClassSessionInput(formData));

  revalidatePath("/admin/classes");
  revalidatePath("/classes");
  revalidatePath(`/book/${classSession.id}`);
  redirect(`/admin/classes/${classSession.id}/edit?created=1`);
}

export async function updateClassSessionAction(classSessionId: string, formData: FormData) {
  await requireAdminSession();
  await updateClassSession(classSessionId, parseClassSessionInput(formData));

  revalidatePath("/admin/classes");
  revalidatePath(`/admin/classes/${classSessionId}/edit`);
  revalidatePath(`/admin/classes/${classSessionId}/registrations`);
  revalidatePath("/classes");
  revalidatePath(`/book/${classSessionId}`);
  redirect(`/admin/classes/${classSessionId}/edit?updated=1`);
}

export async function deleteClassSessionAction(formData: FormData) {
  await requireAdminSession();
  const classSessionId = parseRequiredString(formData, "classSessionId");
  await deleteClassSession(classSessionId);

  revalidatePath("/admin/classes");
  revalidatePath("/classes");
  redirect("/admin/classes?deleted=1");
}

export async function toggleClassSessionStatusAction(formData: FormData) {
  await requireAdminSession();
  const classSessionId = parseRequiredString(formData, "classSessionId");
  const nextStatus = parseStatus(formData);

  await updateClassSessionStatus(classSessionId, nextStatus);

  revalidatePath("/admin/classes");
  revalidatePath(`/admin/classes/${classSessionId}/edit`);
  revalidatePath(`/admin/classes/${classSessionId}/registrations`);
  revalidatePath("/classes");
  revalidatePath(`/book/${classSessionId}`);
}

export async function createAdministratorAction(formData: FormData) {
  const session = await requireSuperAdmin();
  const email = parseRequiredString(formData, "email").toLowerCase();
  const password = parseRequiredString(formData, "password");
  const passwordHash = await bcrypt.hash(password, 10);

  await createAdministrator({
    email,
    passwordHash,
    createdByAdminId: session.adminUserId,
  });

  revalidatePath("/admin/administrators");
  redirect("/admin/administrators?created=1");
}

export async function updateAdministratorAction(adminUserId: string, formData: FormData) {
  await requireSuperAdmin();
  const email = parseRequiredString(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "").trim();
  const isActive = parseBoolean(formData, "isActive");

  await updateAdministrator(adminUserId, {
    email,
    passwordHash: password ? await bcrypt.hash(password, 10) : null,
    isActive,
  });

  revalidatePath("/admin/administrators");
  revalidatePath(`/admin/administrators/${adminUserId}/edit`);
  redirect(`/admin/administrators/${adminUserId}/edit?updated=1`);
}
