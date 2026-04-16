import { Container, PrimaryButton, SecondaryButton } from "@/components/ui";
import { getClassSessionById } from "@/lib/class-sessions";
import { getRegistrationById } from "@/lib/registrations";

export const dynamic = "force-dynamic";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ registration_id?: string; session_id?: string; type?: string }>;
}) {
  const { registration_id: registrationId, session_id: sessionId, type } = await searchParams;
  const registration = registrationId ? await getRegistrationById(registrationId) : null;
  const session = sessionId ? await getClassSessionById(sessionId) : null;
  const paymentConfirmed = registration?.paymentStatus === "paid";
  const isContactInquiry = type === "contact";

  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/90 bg-white px-8 py-14 text-center shadow-[0_25px_70px_rgba(15,23,42,0.06)] sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">
            {isContactInquiry ? "Message Received" : "Registration Received"}
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">
            {isContactInquiry
              ? "Thanks, your inquiry was sent."
              : paymentConfirmed
                ? "Your registration is confirmed."
                : "We received your checkout."}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {isContactInquiry
              ? "Your message has been submitted through the contact form. Someone from A Mother Choice can now follow up with you."
              : paymentConfirmed
                ? "Your payment has been recorded and your class registration is now connected to your selected session."
                : "Your payment is being finalized. If Stripe finished successfully, the registration will update automatically as soon as the webhook completes."}
          </p>

          {!isContactInquiry && (registration || session) ? (
            <div className="mt-8 rounded-[1.75rem] bg-[var(--color-blush)] px-6 py-6 text-left">
              <dl className="grid gap-4 text-sm leading-7 text-slate-700 sm:grid-cols-2">
                {session ? (
                  <div>
                    <dt className="font-semibold text-slate-900">Class session</dt>
                    <dd>{session.title}</dd>
                  </div>
                ) : null}
                {registration ? (
                  <div>
                    <dt className="font-semibold text-slate-900">Attendee</dt>
                    <dd>{registration.attendeeName}</dd>
                  </div>
                ) : null}
                {registration ? (
                  <div>
                    <dt className="font-semibold text-slate-900">Email</dt>
                    <dd>{registration.email}</dd>
                  </div>
                ) : null}
                {registration ? (
                  <div>
                    <dt className="font-semibold text-slate-900">Payment status</dt>
                    <dd className="capitalize">{registration.paymentStatus}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryButton href="/classes">View Classes</PrimaryButton>
            <SecondaryButton href="/contact">Contact Us</SecondaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
