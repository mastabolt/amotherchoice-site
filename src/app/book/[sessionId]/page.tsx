import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PrimaryButton, SecondaryButton } from "@/components/ui";
import { getClassSessionById } from "@/lib/class-sessions";
import { formatCurrencyFromCents, formatDateRange, formatSessionStatus } from "@/lib/formatters";

export default async function BookPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const session = await getClassSessionById(sessionId);

  if (!session) {
    notFound();
  }

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/90 bg-white p-8 shadow-[0_25px_70px_rgba(15,23,42,0.06)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Class Enrollment Preview</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">{session.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{session.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-[var(--color-blush)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Dates</p>
                <p className="mt-2 text-base font-medium text-slate-900">{formatDateRange(session.startDate, session.endDate)}</p>
              </div>
              <div className="rounded-[1.5rem] bg-[var(--color-sand)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Duration</p>
                <p className="mt-2 text-base font-medium text-slate-900">{session.durationDays} days</p>
              </div>
              <div className="rounded-[1.5rem] bg-[var(--color-blush)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Price</p>
                <p className="mt-2 text-base font-medium text-slate-900">{formatCurrencyFromCents(session.price)}</p>
              </div>
              <div className="rounded-[1.5rem] bg-[var(--color-sand)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Capacity</p>
                <p className="mt-2 text-base font-medium text-slate-900">{session.capacity} seats</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-rose-100 p-8 text-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Enrollment Status</p>
            <h2 className="mt-4 text-3xl font-semibold">{formatSessionStatus(session.status)} for booking setup</h2>
            <p className="mt-5 text-base leading-8 text-slate-700">
              This page is now connected to real class session data from the database and is ready for registration and Stripe integration in Phase 3.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <PrimaryButton href="/classes">Back to Classes</PrimaryButton>
              <SecondaryButton href="/contact">Contact Us Instead</SecondaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
