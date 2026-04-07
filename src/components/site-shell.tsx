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
          <Link href="/" className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-500">
              A Mother Choice
            </span>
            <span className="text-lg font-semibold text-slate-900">
              Perinatal Education + Support
            </span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 transition hover:text-rose-500"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/classes"
              className="rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-600"
            >
              View Classes
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-rose-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-500">
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
                  <Link href={item.href} className="transition hover:text-rose-500">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/thank-you" className="transition hover:text-rose-500">
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
