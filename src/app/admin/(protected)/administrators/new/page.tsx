import Link from "next/link";
import { createAdministratorAction } from "@/app/admin/actions";
import { AdminUserForm } from "@/components/admin/admin-user-form";
import { requireSuperAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function NewAdministratorPage() {
  await requireSuperAdmin();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">New Administrator</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Create an administrator account</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          This creates a standard administrator who can manage classes, registrations, and payment visibility.
        </p>
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
        <AdminUserForm action={createAdministratorAction} submitLabel="Create Administrator" />
      </div>

      <Link href="/admin/administrators" className="text-sm font-semibold text-[var(--color-mauve-dark)] hover:text-[var(--color-mauve)]">
        ← Back to administrators
      </Link>
    </div>
  );
}
