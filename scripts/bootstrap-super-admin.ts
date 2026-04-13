import { createSuperAdminIfMissing } from "@/lib/admin-users";

const email = process.env.BOOTSTRAP_SUPER_ADMIN_EMAIL;
const passwordHash = process.env.BOOTSTRAP_SUPER_ADMIN_PASSWORD_HASH;

if (!email || !passwordHash) {
  throw new Error("BOOTSTRAP_SUPER_ADMIN_EMAIL and BOOTSTRAP_SUPER_ADMIN_PASSWORD_HASH are required");
}

async function main() {
  const bootstrapEmail = email!;
  const bootstrapPasswordHash = passwordHash!;
  const result = await createSuperAdminIfMissing({ email: bootstrapEmail, passwordHash: bootstrapPasswordHash });

  if (!result.created) {
    console.log("Super admin already exists. No changes made.");
    return;
  }

  console.log(`Created super admin: ${result.email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
