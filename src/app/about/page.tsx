import { Container, PrimaryButton, SectionIntro, SecondaryButton } from "@/components/ui";

export default function AboutPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionIntro
          eyebrow="About A Mother Choice"
          title="A deeper look at our mission, philosophy, and the people we serve."
          description="This page carries the fuller story behind A Mother Choice, so the homepage can stay focused on guidance and navigation while this space handles the deeper brand narrative."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/90 bg-white p-8 shadow-[0_25px_70px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-500">Mission</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Support both professionals and families with clarity, care, and confidence.</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              A Mother Choice exists to create a place where professional training and family support feel equally intentional. We want visitors to know exactly where to go, what we offer, and how to take the next step.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/90 bg-white p-8 shadow-[0_25px_70px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-500">Philosophy</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Education should feel modern, grounded, and deeply human.</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              We believe the best perinatal education blends professionalism with warmth. That applies to certification-focused trainings as much as it does to postpartum support and lactation guidance.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-[var(--color-blush)] p-8 shadow-[0_25px_70px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-500">Who We Serve</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Professionals building expertise</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              We offer structured training pathways for professionals pursuing childbirth education, lactation education, and certification-oriented career development.
            </p>
          </div>
          <div className="rounded-[2rem] bg-[var(--color-sand)] p-8 shadow-[0_25px_70px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-500">Who We Serve</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Families seeking support</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              We also care for expecting parents and new mothers through lactation support, post-birth education, and one-on-one guidance that helps families feel informed and reassured.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] bg-slate-900 px-8 py-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-200">Approach</p>
          <h2 className="mt-4 text-3xl font-semibold">We build trust through calm design, clear education, and compassionate support.</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">
            That means clear page structure, thoughtful communication, and offerings that feel both credible and welcoming. This site is intentionally organized so visitors can move from overview, to deeper understanding, to class selection without confusion.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <PrimaryButton href="/classes">Browse Classes</PrimaryButton>
            <SecondaryButton href="/contact">Contact Us</SecondaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
