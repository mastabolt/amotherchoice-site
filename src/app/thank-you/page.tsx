import { Container, PrimaryButton } from "@/components/ui";

export default function ThankYouPage() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/90 bg-white px-8 py-14 text-center shadow-[0_25px_70px_rgba(15,23,42,0.06)] sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Thank You</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">We appreciate you reaching out.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            This confirmation page is ready for future registration and payment flows, while still giving the site a polished and complete public experience in Phase 1.
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryButton href="/classes">View Classes</PrimaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
