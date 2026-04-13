import { SignJWT, jwtVerify } from "jose";
import { AdminRole } from "@/lib/admin-users";

export const ADMIN_SESSION_COOKIE = "amc_admin_session";

export type AdminSessionPayload = {
  adminUserId: string;
  email: string;
  role: AdminRole;
};

function getAdminSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is required");
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminSessionToken(payload: AdminSessionPayload) {
  return new SignJWT({
    adminUserId: payload.adminUserId,
    email: payload.email,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.adminUserId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getAdminSessionSecret());
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getAdminSessionSecret());

    if (
      typeof payload.adminUserId !== "string" ||
      typeof payload.email !== "string" ||
      (payload.role !== "super_admin" && payload.role !== "admin")
    ) {
      return null;
    }

    return {
      adminUserId: payload.adminUserId,
      email: payload.email,
      role: payload.role,
    } satisfies AdminSessionPayload;
  } catch {
    return null;
  }
}
