import Link from "next/link";
import { classSessions } from "@/data/classSessions";
import { Container, PrimaryButton, SecondaryButton, SectionIntro } from "@/components/ui";

const featuredSessions = classSessions.slice(0, 3);

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">
                For Professionals + Families
              </p>
              <h1 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-tight text-slate-900 sm:text-6xl">
                Perinatal education, certification training, and nurturing support in one modern home.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                A Mother Choice supports professionals growing their careers and families seeking calm, trusted guidance through childbirth education, lactation support, and postpartum care.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <PrimaryButton href="/classes">Explore Classes</PrimaryButton>
                <SecondaryButton href="/contact">Contact Us</SecondaryButton>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-[var(--color-blush)] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Professionals</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">Training + Certification</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    CAPPA training pathways, structured multi-day classes, and certification-focused education.
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-[var(--color-sand)] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Parents</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">Support + Education</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Lactation guidance, postpartum education, and one-on-one support for growing families.
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-[1.5rem] bg-slate-900 px-6 py-7 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-200">Our Promise</p>
                <p className="mt-3 text-lg leading-8 text-slate-100">
                  We support both professionals and families with compassionate, evidence-informed education that feels calm, modern, and deeply human.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-18 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-rose-100 bg-white p-8 shadow-[0_25px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">For Professionals</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">Advance your training with certification-focused learning.</h2>
              <ul className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                <li>CAPPA Childbirth Educator Training</li>
                <li>CAPPA Certified Lactation Educator (CLE®) Training</li>
                <li>Structured multi-day certification pathways</li>
                <li>Professional education designed to feel supportive and practical</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-[0_25px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">For Parents</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">Receive warm, grounded support for pregnancy, feeding, and postpartum care.</h2>
              <ul className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                <li>Lactation support and feeding education</li>
                <li>Postpartum care guidance for new mothers</li>
                <li>One-on-one support and family-centered education</li>
                <li>Resources designed to build confidence and calm</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-18 sm:py-20">
        <Container>
          <SectionIntro
            eyebrow="Featured Classes"
            title="Upcoming sessions designed for real enrollment, clear next steps, and a polished experience."
            description="Phase 1 includes mock session data so the site already feels like a credible class enrollment platform, with room for registration and Stripe in the next phase."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredSessions.map((session) => (
              <article
                key={session.id}
                className="flex h-full flex-col rounded-[1.75rem] border border-white/90 bg-white p-7 shadow-[0_25px_70px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-500">
                    {session.status}
                  </span>
                  <span className="text-sm font-medium text-slate-500">{session.durationDays} days</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-slate-900">{session.title}</h3>
                <p className="mt-4 flex-1 text-base leading-7 text-slate-600">{session.description}</p>
                <dl className="mt-6 space-y-2 text-sm text-slate-500">
                  <div className="flex justify-between gap-4">
                    <dt>Dates</dt>
                    <dd className="text-right text-slate-700">{session.startDate} - {session.endDate}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Capacity</dt>
                    <dd className="text-slate-700">{session.capacity} seats</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Price</dt>
                    <dd className="text-slate-700">${session.price}</dd>
                  </div>
                </dl>
                <Link
                  href={`/book/${session.id}`}
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Book This Class
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-18 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-200">Why Choose A Mother Choice</p>
              <h2 className="mt-4 text-3xl font-semibold">A calm, professional experience built around trust.</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                "Dual-audience positioning for professionals and families",
                "Warm, supportive brand presentation without losing professionalism",
                "Class-centered structure ready for multi-attendee registration in Phase 2",
                "Clear pathways to classes, support, and contact from day one",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/90 bg-white p-6 text-base leading-7 text-slate-600 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 pt-10 sm:pb-24">
        <Container>
          <div className="rounded-[2.25rem] bg-[var(--color-blush)] px-8 py-12 shadow-[0_25px_70px_rgba(15,23,42,0.06)] sm:px-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Ready to Begin?</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Explore available classes or reach out for guidance on the best next step.
                </h2>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <PrimaryButton href="/classes">See Available Classes</PrimaryButton>
                <SecondaryButton href="/contact">Talk With Us</SecondaryButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
