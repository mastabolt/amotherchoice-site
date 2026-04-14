import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-[rgba(251,248,244,0.86)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/amotherchoice-logo.png"
              alt="A Mother Choice"
              width={615}
              height={177}
              className="h-12 w-auto sm:h-14"
              priority
            />
          </Link>
          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href="/admin/login"
              aria-label="Admin login"
              title="Admin login"
              className="inline-flex size-10 items-center justify-center rounded-full border border-rose-100 bg-white text-slate-700 transition hover:border-[var(--color-mauve)] hover:text-[var(--color-mauve-dark)] md:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.125a7.5 7.5 0 0 1 15 0" />
              </svg>
            </Link>
            <nav className="hidden items-center gap-7 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-slate-700 transition hover:text-[var(--color-mauve-dark)]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/admin/login"
                aria-label="Admin login"
                title="Admin login"
                className="inline-flex size-10 items-center justify-center rounded-full border border-rose-100 bg-white text-slate-700 transition hover:border-[var(--color-mauve)] hover:text-[var(--color-mauve-dark)]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.125a7.5 7.5 0 0 1 15 0" />
                </svg>
              </Link>
              <Link
                href="/classes"
                className="rounded-full bg-[var(--color-mauve)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-mauve-dark)]"
              >
                View Classes
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-rose-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-mauve)]">
              A Mother Choice
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              Education, training, and compassionate support for professionals and families.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              We support both professionals pursuing certification-based training and families seeking trusted perinatal education, lactation support, and postpartum guidance.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-[var(--color-mauve-dark)]">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/thank-you" className="transition hover:text-[var(--color-mauve-dark)]">
                  Thank You
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Phone: 954-849-1221</li>
              <li>Email: info@amotherchoice.com</li>
              <li>Location: Fort Lauderdale, FL 33312</li>
              <li>Hours: W-F 9 am–5 pm</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
