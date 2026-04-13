"use server";

import { redirect } from "next/navigation";
import { authenticateAdmin, setAdminSession } from "@/lib/admin-auth";

export type LoginFormState = {
  error?: string;
};

export async function loginAdminAction(_: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/admin/classes");

  const adminUser = await authenticateAdmin(email, password);

  if (!adminUser) {
    return { error: "Invalid admin credentials." };
  }

  await setAdminSession(adminUser);
  redirect(nextPath.startsWith("/admin") ? nextPath : "/admin/classes");
}
