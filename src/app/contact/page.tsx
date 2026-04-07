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
              description="This is a distinct contact page, not a homepage section, so visitors can clearly find contact information and a simple inquiry form in one place."
            />
            <div className="mt-8 rounded-[1.75rem] bg-[var(--color-blush)] p-6">
              <h2 className="text-2xl font-semibold text-slate-900">Need class help?</h2>
              <p className="mt-3 text-base leading-8 text-slate-600">
                If you are unsure which training or support session is right for you, reach out and we can help guide you to the best fit.
              </p>
              <div className="mt-6">
                <PrimaryButton href="/classes">Browse Classes</PrimaryButton>
              </div>
            </div>
          </div>

          <div className="space-y-8">
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
            </div>

            <div className="rounded-[2rem] border border-white/90 bg-white p-8 shadow-[0_25px_70px_rgba(15,23,42,0.06)] sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-500">Inquiry Form</p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">Simple placeholder form for Phase 1</h2>
              <form className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
                />
                <textarea
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
                />
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
                >
                  Send Message (Phase 1 Placeholder)
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
