import Link from "next/link";
import { deleteClassSessionAction, toggleClassSessionStatusAction } from "@/app/admin/actions";
import { getAdminClassSessionSummaries } from "@/lib/class-sessions";
import { formatCurrencyFromCents, formatDateRange, formatSessionStatus } from "@/lib/formatters";

export const dynamic = "force-dynamic";

export default async function AdminClassesPage({
  searchParams,
}: {
  searchParams: Promise<{ deleted?: string }>;
}) {
  const { deleted } = await searchParams;
  const sessions = await getAdminClassSessionSummaries();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Class sessions</h2>
          <p className="mt-2 text-base leading-7 text-slate-600">
            Create, edit, open, close, and review registrations for every live class session.
          </p>
        </div>
        <Link
          href="/admin/classes/new"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-mauve)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-mauve-dark)]"
        >
          Create New Class
        </Link>
      </div>

      {deleted === "1" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
          Class session deleted.
        </div>
      ) : null}

      <div className="grid gap-5">
        {sessions.map((session) => {
          const nextStatus = session.status === "open" ? "closed" : "open";

          return (
            <article key={session.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-500">
                      {formatSessionStatus(session.status)}
                    </span>
                    <span className="text-sm text-slate-500">{formatDateRange(session.startDate, session.endDate)}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">{session.title}</h3>
                    <p className="mt-2 max-w-3xl text-base leading-7 text-slate-600">{session.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 rounded-[1.5rem] bg-white p-4 text-sm text-slate-600 sm:grid-cols-4 lg:min-w-[360px]">
                  <div>
                    <p className="font-semibold text-slate-900">Price</p>
                    <p>{formatCurrencyFromCents(session.price)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Capacity</p>
                    <p>{session.capacity}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Registrations</p>
                    <p>{session.registrationCount}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Paid / Pending</p>
                    <p>
                      {session.paidRegistrationCount} / {session.pendingRegistrationCount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/admin/classes/${session.id}/edit`}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-mauve)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-mauve-dark)]"
                >
                  Edit Class
                </Link>
                <Link
                  href={`/admin/classes/${session.id}/registrations`}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-[var(--color-mauve)] hover:text-[var(--color-mauve-dark)]"
                >
                  View Registrations
                </Link>
                <form action={toggleClassSessionStatusAction}>
                  <input type="hidden" name="classSessionId" value={session.id} />
                  <input type="hidden" name="status" value={nextStatus} />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-amber-400 hover:text-amber-700"
                  >
                    {session.status === "open" ? "Close Class" : "Open Class"}
                  </button>
                </form>
                <form action={deleteClassSessionAction}>
                  <input type="hidden" name="classSessionId" value={session.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
