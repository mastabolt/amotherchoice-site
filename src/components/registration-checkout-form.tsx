"use client";

import { FormEvent, useState } from "react";

type RegistrationCheckoutFormProps = {
  classSessionId: string;
  sessionTitle: string;
  sessionStatus: string;
  cancelled?: boolean;
};

export function RegistrationCheckoutForm({
  classSessionId,
  sessionTitle,
  sessionStatus,
  cancelled = false,
}: RegistrationCheckoutFormProps) {
  const [attendeeName, setAttendeeName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOpen = sessionStatus === "open";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classSessionId,
          attendeeName,
          email,
          phone,
          notes,
        }),
      });

      const data = (await response.json()) as { error?: string; checkoutUrl?: string };

      if (!response.ok || !data.checkoutUrl) {
        setError(data.error ?? "Something went wrong starting checkout.");
        setIsSubmitting(false);
        return;
      }

      window.location.assign(data.checkoutUrl);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong starting checkout.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-[2rem] bg-rose-100 p-8 text-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Registration</p>
      <h2 className="mt-4 text-3xl font-semibold">Reserve your spot in {sessionTitle}</h2>
      <p className="mt-5 text-base leading-8 text-slate-700">
        Complete this short form and you&apos;ll be taken to Stripe Checkout to finish payment securely.
      </p>

      {cancelled ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Checkout was canceled. Your registration was saved as pending, and you can retry payment below.
        </div>
      ) : null}

      {!isOpen ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 text-sm leading-7 text-slate-700">
          This class is not currently open for registration. Please contact A Mother Choice if you need help enrolling.
        </div>
      ) : (
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-800">Attendee name</span>
            <input
              type="text"
              value={attendeeName}
              onChange={(event) => setAttendeeName(event.target.value)}
              required
              className="w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-rose-400"
              placeholder="Your full name"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-800">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-rose-400"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-800">Phone</span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
              className="w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-rose-400"
              placeholder="(555) 555-5555"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-800">Notes (optional)</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              className="w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-rose-400"
              placeholder="Anything helpful we should know before class?"
            />
          </label>

          {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-mauve)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-mauve-dark)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Redirecting to Stripe..." : "Continue to Stripe Checkout"}
          </button>

          <p className="text-sm leading-7 text-slate-600">
            A pending registration is created before checkout so your payment can be tied back to this specific class session.
          </p>
        </form>
      )}
    </div>
  );
}
