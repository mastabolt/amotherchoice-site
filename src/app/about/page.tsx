import { Container, PrimaryButton, SectionIntro, SecondaryButton } from "@/components/ui";

export default function AboutPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionIntro
          eyebrow="About A Mother Choice"
          title="A perinatal education and support platform built for both professionals and families."
          description="A Mother Choice exists to create a warm, modern, and trustworthy space where certification-focused training and family-centered support can live side by side."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/90 bg-white p-8 shadow-[0_25px_70px_rgba(15,23,42,0.06)]">
            <h2 className="text-2xl font-semibold text-slate-900">For professionals</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              We offer structured, certification-oriented trainings for professionals pursuing childbirth education, lactation education, and career-focused growth in the perinatal space.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/90 bg-white p-8 shadow-[0_25px_70px_rgba(15,23,42,0.06)]">
            <h2 className="text-2xl font-semibold text-slate-900">For families</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              We also support expecting parents and new mothers with lactation support, postpartum education, and one-on-one guidance designed to make families feel informed and cared for.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] bg-slate-900 px-8 py-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
          <h2 className="text-3xl font-semibold">Our approach</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">
            We believe perinatal education should feel grounded, accessible, and deeply human. That means clean communication, thoughtful training experiences, and support that meets people with care and professionalism.
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
