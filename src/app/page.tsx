import Image from "next/image";
import Link from "next/link";
import { classSessions } from "@/data/classSessions";
import { Container, PrimaryButton, SecondaryButton } from "@/components/ui";

const featuredSessions = classSessions.slice(0, 2);

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-24">
        <Container>
          <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/80 bg-white/85 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-mauve)]">Professionals</p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">Certification-focused childbirth and lactation education.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/80 bg-white/85 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-mauve)]">Families</p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">Lactation support, postpartum guidance, and nurturing care.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/80 bg-white/85 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-mauve)]">Format</p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">Structured classes, clear pathways, and real next steps.</p>
                </div>
              </div>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">
                For Families and Professionals
              </p>
              <h1 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-tight text-slate-900 sm:text-6xl">
                Education, training, and perinatal support with a clear path forward.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                A Mother Choice is a modern multi-page platform for certification-focused trainings, family education, lactation support, and postpartum guidance.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <PrimaryButton href="/classes">Explore Classes</PrimaryButton>
                <SecondaryButton href="/about">Learn About Us</SecondaryButton>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
              <div className="overflow-hidden rounded-[1.75rem]">
                <Image
                  src="/mother-baby-hero.png"
                  alt="A mother holding her baby"
                  width={1536}
                  height={1024}
                  className="h-[260px] w-full object-cover sm:h-[320px]"
                  priority
                />
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-[var(--color-blush)] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Professionals</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">Training + Certification</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    CAPPA trainings and structured multi-day learning for certification-minded professionals.
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-[var(--color-sand)] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Parents</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">Support + Education</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Compassionate lactation support, postpartum education, and family-centered guidance.
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-[1.5rem] bg-rose-100 px-6 py-7 text-slate-900">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Overview</p>
                <p className="mt-3 text-lg leading-8 text-slate-700">
                  Explore classes, learn who we are, and reach out for support through clearly separated pages built for a real business website.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-18 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-white/90 bg-white p-8 shadow-[0_25px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">About</p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">Learn our mission, philosophy, and approach.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Visit the About page for the deeper story behind A Mother Choice and how we serve both audiences with care.
              </p>
              <Link href="/about" className="mt-6 inline-flex text-sm font-semibold text-rose-500 transition hover:text-slate-900">
                Go to About
              </Link>
            </div>
            <div className="rounded-[2rem] border border-white/90 bg-white p-8 shadow-[0_25px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Classes</p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">Browse class sessions and choose the right fit.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                The Classes page is the main enrollment hub, with session details, pricing, capacity, and booking paths.
              </p>
              <Link href="/classes" className="mt-6 inline-flex text-sm font-semibold text-rose-500 transition hover:text-slate-900">
                Go to Classes
              </Link>
            </div>
            <div className="rounded-[2rem] border border-white/90 bg-white p-8 shadow-[0_25px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Contact</p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">Ask questions or request guidance.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Reach out through the Contact page for support, class questions, or help choosing the best next step.
              </p>
              <Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-rose-500 transition hover:text-slate-900">
                Go to Contact
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-18 sm:py-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Featured Classes</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">A quick preview of upcoming sessions.</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                This is a homepage snapshot only. Full enrollment browsing lives on the dedicated Classes page.
              </p>
            </div>
            <div className="hidden sm:block">
              <SecondaryButton href="/classes">View All Classes</SecondaryButton>
            </div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
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
                    <dt>Price</dt>
                    <dd className="text-slate-700">${session.price}</dd>
                  </div>
                </dl>
                <Link
                  href={`/book/${session.id}`}
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
                >
                  Book This Class
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 pt-10 sm:pb-24">
        <Container>
          <div className="rounded-[2.25rem] bg-[var(--color-blush)] px-8 py-12 shadow-[0_25px_70px_rgba(15,23,42,0.06)] sm:px-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Next Step</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Use the navigation to explore the site the way a real visitor would.
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
