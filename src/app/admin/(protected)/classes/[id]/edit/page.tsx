import Link from "next/link";
import { notFound } from "next/navigation";
import { updateClassSessionAction } from "@/app/admin/actions";
import { ClassSessionForm } from "@/components/admin/class-session-form";
import { getClassSessionById } from "@/lib/class-sessions";

export const dynamic = "force-dynamic";

export default async function AdminEditClassPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string; updated?: string }>;
}) {
  const { id } = await params;
  const { created, updated } = await searchParams;
  const session = await getClassSessionById(id);

  if (!session) {
    notFound();
  }

  const updateAction = updateClassSessionAction.bind(null, session.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Edit Class Session</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">{session.title}</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Update details, pricing, dates, capacity, and status for this class session.
          </p>
        </div>
        <Link
          href={`/admin/classes/${session.id}/registrations`}
          className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-[var(--color-mauve)] hover:text-[var(--color-mauve-dark)]"
        >
          View Registrations
        </Link>
      </div>

      {created === "1" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
          Class session created.
        </div>
      ) : null}

      {updated === "1" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
          Class session updated.
        </div>
      ) : null}

      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
        <ClassSessionForm action={updateAction} submitLabel="Save Changes" initialValues={session} />
      </div>

      <Link href="/admin/classes" className="text-sm font-semibold text-[var(--color-mauve-dark)] hover:text-[var(--color-mauve)]">
        ← Back to classes
      </Link>
    </div>
  );
}
