import "server-only";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminUserByEmail, getAdminUserById } from "@/lib/admin-users";
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, verifyAdminSessionToken } from "@/lib/admin-session";

export async function authenticateAdmin(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const adminUser = await getAdminUserByEmail(normalizedEmail);

  if (!adminUser || !adminUser.isActive) {
    return null;
  }

  const isValid = await bcrypt.compare(password, adminUser.passwordHash);

  if (!isValid) {
    return null;
  }

  return adminUser;
}

export async function setAdminSession(adminUser: { id: string; email: string; role: "super_admin" | "admin" }) {
  const cookieStore = await cookies();
  const token = await createAdminSessionToken({
    adminUserId: adminUser.id,
    email: adminUser.email,
    role: adminUser.role,
  });

  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyAdminSessionToken(token);

  if (!payload) {
    return null;
  }

  const adminUser = await getAdminUserById(payload.adminUserId);

  if (!adminUser || !adminUser.isActive) {
    return null;
  }

  return {
    adminUserId: adminUser.id,
    email: adminUser.email,
    role: adminUser.role,
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function requireSuperAdmin() {
  const session = await requireAdminSession();

  if (session.role !== "super_admin") {
    redirect("/admin/classes");
  }

  return session;
}
