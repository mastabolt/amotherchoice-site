import { Container, PrimaryButton, SectionIntro } from "@/components/ui";

const ZOHO_INQUIRY_FORM_URL =
  "https://forms.zohopublic.com/nutreevit1/form/inquiry/formperma/CCLgW3ogrvNOnd1ja2X3jVcIGdXmX2wEj0KUssovukQ";

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
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">Send us a message</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                This form is now loaded directly from Zoho so submissions go straight into your inquiry form.
              </p>
              <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50">
                <iframe
                  src={ZOHO_INQUIRY_FORM_URL}
                  title="A Mother Choice Inquiry Form"
                  className="min-h-[760px] w-full bg-white"
                />
              </div>
              <a
                href={ZOHO_INQUIRY_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex text-sm font-semibold text-[var(--color-mauve)] transition hover:text-[var(--color-mauve-dark)]"
              >
                Open the form in a new tab
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
