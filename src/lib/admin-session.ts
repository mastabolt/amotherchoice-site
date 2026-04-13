import { SignJWT, jwtVerify } from "jose";

export const ADMIN_SESSION_COOKIE = "amc_admin_session";

function getAdminSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is required");
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminSessionToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getAdminSessionSecret());
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getAdminSessionSecret());

    if (typeof payload.email !== "string") {
      return null;
    }

    return { email: payload.email };
  } catch {
    return null;
  }
}
