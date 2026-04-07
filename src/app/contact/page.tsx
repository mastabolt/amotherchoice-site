import { Container, PrimaryButton, SectionIntro } from "@/components/ui";

export default function ContactPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionIntro
              eyebrow="Contact"
              title="Reach out for support, class questions, or guidance on where to begin."
              description="Whether you are a professional looking for training or a family looking for support, A Mother Choice is here to help you find the right next step."
            />
          </div>

          <div className="rounded-[2rem] border border-white/90 bg-white p-8 shadow-[0_25px_70px_rgba(15,23,42,0.06)] sm:p-10">
            <dl className="grid gap-6 text-base leading-8 text-slate-600 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">Phone</dt>
                <dd className="mt-2 text-lg text-slate-900">954-849-1221</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">Email</dt>
                <dd className="mt-2 text-lg text-slate-900">info@amotherchoice.com</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">Location</dt>
                <dd className="mt-2 text-lg text-slate-900">Fort Lauderdale, FL 33312</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">Hours</dt>
                <dd className="mt-2 text-lg text-slate-900">W-F 9 am–5 pm</dd>
              </div>
            </dl>
            <div className="mt-10 rounded-[1.5rem] bg-[var(--color-blush)] p-6">
              <h2 className="text-2xl font-semibold text-slate-900">Need class help?</h2>
              <p className="mt-3 text-base leading-8 text-slate-600">
                If you are unsure which training or support session is right for you, reach out and we can help you choose the best fit.
              </p>
              <div className="mt-6">
                <PrimaryButton href="/classes">Browse Classes</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
