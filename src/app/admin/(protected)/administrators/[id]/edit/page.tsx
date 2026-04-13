import Link from "next/link";
import { notFound } from "next/navigation";
import { updateAdministratorAction } from "@/app/admin/actions";
import { AdminUserForm } from "@/components/admin/admin-user-form";
import { requireSuperAdmin } from "@/lib/admin-auth";
import { getAdminUserById } from "@/lib/admin-users";

export const dynamic = "force-dynamic";

export default async function EditAdministratorPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ updated?: string }>;
}) {
  await requireSuperAdmin();
  const { id } = await params;
  const { updated } = await searchParams;
  const adminUser = await getAdminUserById(id);

  if (!adminUser || adminUser.role !== "admin") {
    notFound();
  }

  const updateAction = updateAdministratorAction.bind(null, adminUser.id);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Edit Administrator</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">{adminUser.email}</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          Update administrator email, password, or active status.
        </p>
      </div>

      {updated === "1" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
          Administrator updated.
        </div>
      ) : null}

      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
        <AdminUserForm action={updateAction} submitLabel="Save Administrator" initialValues={adminUser} />
      </div>

      <Link href="/admin/administrators" className="text-sm font-semibold text-[var(--color-mauve-dark)] hover:text-[var(--color-mauve)]">
        ← Back to administrators
      </Link>
    </div>
  );
}
