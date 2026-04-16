import Link from "next/link";
import { ReactNode } from "react";
import { logoutAdminAction } from "@/app/admin/actions";
import { Container } from "@/components/ui";
import { requireAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="rounded-[2rem] border border-white/90 bg-white p-6 shadow-[0_25px_70px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">A Mother Choice Admin</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">Internal class management</h1>
              <p className="mt-2 text-sm text-slate-500">
                Signed in as {session.email} · {session.role === "super_admin" ? "Super Admin" : "Administrator"}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/classes"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-[var(--color-mauve)] hover:text-[var(--color-mauve-dark)]"
              >
                Classes
              </Link>
              <Link
                href="/admin/classes/new"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-mauve)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-mauve-dark)]"
              >
                New Class
              </Link>
              {session.role === "super_admin" ? (
                <Link
                  href="/admin/administrators"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-[var(--color-mauve)] hover:text-[var(--color-mauve-dark)]"
                >
                  Administrators
                </Link>
              ) : null}
              <Link
                href="/admin/password"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-[var(--color-mauve)] hover:text-[var(--color-mauve-dark)]"
              >
                Change Password
              </Link>
              <form action={logoutAdminAction}>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-rose-400 hover:text-rose-600"
                >
                  Log Out
                </button>
              </form>
            </div>
          </div>

          <div className="pt-8">{children}</div>
        </div>
      </Container>
    </section>
  );
}
