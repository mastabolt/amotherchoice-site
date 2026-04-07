import Image from "next/image";
import Link from "next/link";
import { classSessions } from "@/data/classSessions";
import { Container, SectionIntro } from "@/components/ui";

export default function ClassesPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-3 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
            <Image
              src="/classes1.jpg"
              alt="A Mother Choice class participants holding certificates together"
              width={2560}
              height={1440}
              className="h-[250px] w-full rounded-[1.5rem] object-cover object-center sm:h-[340px]"
              priority
            />
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-3 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
            <Image
              src="/classes2.jpg"
              alt="Training session in progress"
              width={2560}
              height={1920}
              className="h-[250px] w-full rounded-[1.5rem] object-cover sm:h-[340px]"
              priority
            />
          </div>
        </div>

        <div className="mt-10">
          <SectionIntro
            eyebrow="Classes"
            title="Upcoming trainings and support sessions"
            description="Browse real class experiences, professional trainings, and support-centered sessions designed for both professionals and families."
          />
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500">
            Featuring your uploaded classroom and graduation photos so the page feels grounded, warm, and real.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {classSessions.map((session, index) => (
            <article
              key={session.id}
              className="flex h-full flex-col rounded-[1.85rem] border border-white/90 bg-white p-7 shadow-[0_25px_70px_rgba(15,23,42,0.06)]"
            >
              <div className="overflow-hidden rounded-[1.5rem]">
                <Image
                  src={
                    index === 0
                      ? "/classes3.jpeg"
                      : index === 1
                        ? "/classes2.jpg"
                        : "/classes1.jpg"
                  }
                  alt={session.title}
                  width={2560}
                  height={1920}
                  className="h-[190px] w-full object-cover"
                />
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-500">
                  {session.status}
                </span>
                <span className="text-sm text-slate-500">{session.durationDays} days</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-slate-900">{session.title}</h2>
              <p className="mt-4 flex-1 text-base leading-7 text-slate-600">{session.description}</p>
              <dl className="mt-6 space-y-3 text-sm leading-6 text-slate-500">
                <div className="flex justify-between gap-4">
                  <dt>Dates</dt>
                  <dd className="text-right text-slate-700">{session.startDate} - {session.endDate}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Duration</dt>
                  <dd className="text-slate-700">{session.durationDays} days</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Price</dt>
                  <dd className="text-slate-700">${session.price}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Capacity</dt>
                  <dd className="text-slate-700">{session.capacity} seats</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Status</dt>
                  <dd className="text-slate-700">{session.status}</dd>
                </div>
              </dl>
              <Link
                href={`/book/${session.id}`}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-mauve)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-mauve-dark)]"
              >
                Book This Class
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] bg-[var(--color-blush)] p-8 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-mauve)]">Learning Environment</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Real classroom experiences with guidance, training, and community.</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              These sessions are designed to feel supportive, practical, and professionally grounded, whether participants are pursuing certification-focused education or family-centered learning.
            </p>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-3 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
            <Image
              src="/classes3.jpeg"
              alt="Training participants standing together"
              width={2560}
              height={1920}
              className="h-[250px] w-full rounded-[1.5rem] object-cover sm:h-[320px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
