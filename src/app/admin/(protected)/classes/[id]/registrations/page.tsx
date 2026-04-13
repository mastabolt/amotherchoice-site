import Link from "next/link";
import { notFound } from "next/navigation";
import { getClassSessionById } from "@/lib/class-sessions";
import { formatCurrencyFromCents, formatDateRange } from "@/lib/formatters";
import { getRegistrationsByClassSessionId } from "@/lib/registrations";

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

export default async function AdminRegistrationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getClassSessionById(id);

  if (!session) {
    notFound();
  }

  const registrations = await getRegistrationsByClassSessionId(session.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Registrations</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">{session.title}</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            {formatDateRange(session.startDate, session.endDate)} • {formatCurrencyFromCents(session.price)} • {session.capacity} seats
          </p>
        </div>
        <Link
          href={`/admin/classes/${session.id}/edit`}
          className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-[var(--color-mauve)] hover:text-[var(--color-mauve-dark)]"
        >
          Back to Edit
        </Link>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm font-semibold text-slate-700">
                <th className="px-5 py-4">Attendee</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4">Registration</th>
                <th className="px-5 py-4">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                    No registrations yet for this class.
                  </td>
                </tr>
              ) : (
                registrations.map((registration) => (
                  <tr key={registration.id}>
                    <td className="px-5 py-4 align-top">
                      <p className="font-semibold text-slate-900">{registration.attendeeName}</p>
                      {registration.notes ? <p className="mt-1 max-w-sm text-xs text-slate-500">{registration.notes}</p> : null}
                    </td>
                    <td className="px-5 py-4 align-top">
                      <p>{registration.email}</p>
                      <p className="mt-1 text-slate-500">{registration.phone}</p>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <span className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-rose-600">
                        {registration.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <p className="capitalize">{registration.registrationStatus}</p>
                    </td>
                    <td className="px-5 py-4 align-top text-slate-500">{formatDateTime(registration.createdAt)}</td>
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
