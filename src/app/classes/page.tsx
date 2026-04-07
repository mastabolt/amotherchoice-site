import Link from "next/link";
import { classSessions } from "@/data/classSessions";
import { Container, SectionIntro } from "@/components/ui";

export default function ClassesPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionIntro
          eyebrow="Classes"
          title="Upcoming trainings and support sessions"
          description="This enrollment page is structured around class sessions, not appointment slots, so multiple attendees can register for the same offering in future phases."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {classSessions.map((session) => (
            <article
              key={session.id}
              className="flex h-full flex-col rounded-[1.85rem] border border-white/90 bg-white p-7 shadow-[0_25px_70px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center justify-between gap-4">
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
      </Container>
    </section>
  );
}
