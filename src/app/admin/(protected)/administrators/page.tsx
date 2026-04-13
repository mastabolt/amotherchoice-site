import Link from "next/link";
import { requireSuperAdmin } from "@/lib/admin-auth";
import { listAdministratorUsers } from "@/lib/admin-users";

export const dynamic = "force-dynamic";

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}

export default async function AdministratorsPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string }>;
}) {
  await requireSuperAdmin();
  const { created } = await searchParams;
  const administrators = await listAdministratorUsers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Administrators</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Manage administrator accounts</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Super Admins can create, edit, and deactivate administrator accounts. Super-admin accounts are not managed here.
          </p>
        </div>
        <Link
          href="/admin/administrators/new"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-mauve)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-mauve-dark)]"
        >
          New Administrator
        </Link>
      </div>

      {created === "1" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
          Administrator created.
        </div>
      ) : null}

      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm font-semibold text-slate-700">
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Created By</th>
                <th className="px-5 py-4">Updated</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {administrators.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                    No administrator accounts yet.
                  </td>
                </tr>
              ) : (
                administrators.map((admin) => (
                  <tr key={admin.id}>
                    <td className="px-5 py-4 font-medium text-slate-900">{admin.email}</td>
                    <td className="px-5 py-4">{admin.isActive ? "Active" : "Inactive"}</td>
                    <td className="px-5 py-4">{admin.createdByEmail ?? "Bootstrap"}</td>
                    <td className="px-5 py-4">{formatDateTime(admin.updatedAt)}</td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/administrators/${admin.id}/edit`}
                        className="font-semibold text-[var(--color-mauve-dark)] hover:text-[var(--color-mauve)]"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
