import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
import { Container, SecondaryButton } from "@/components/ui";
import { RegistrationCheckoutForm } from "@/components/registration-checkout-form";
import { getClassSessionById } from "@/lib/class-sessions";
import { formatCurrencyFromCents, formatDateRange, formatSessionStatus } from "@/lib/formatters";

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ cancelled?: string }>;
}) {
  const { sessionId } = await params;
  const { cancelled } = await searchParams;
  const session = await getClassSessionById(sessionId);

  if (!session) {
    notFound();
  }

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/90 bg-white p-8 shadow-[0_25px_70px_rgba(15,23,42,0.06)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Class Registration</p>
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

            <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Status</p>
              <p className="mt-2 text-base font-medium text-slate-900">{formatSessionStatus(session.status)}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Registrations create a pending record first, then redirect to Stripe Checkout so payment stays tied to this class session.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/classes"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-mauve)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-mauve-dark)]"
              >
                Back to Classes
              </Link>
              <SecondaryButton href="/contact">Need Help Instead?</SecondaryButton>
            </div>
          </div>

          <RegistrationCheckoutForm
            classSessionId={session.id}
            sessionTitle={session.title}
            sessionStatus={session.status}
            cancelled={cancelled === "1"}
          />
        </div>
      </Container>
    </section>
  );
}
