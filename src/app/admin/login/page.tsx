import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { Container } from "@/components/ui";
import { getAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/classes");
  }

  const { next } = await searchParams;

  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="mx-auto max-w-md rounded-[2rem] border border-white/90 bg-white px-8 py-12 shadow-[0_25px_70px_rgba(15,23,42,0.08)] sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Admin Login</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Sign in to manage classes</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            This internal admin gives you simple control over class sessions, registrations, and payment visibility.
          </p>

          <AdminLoginForm nextPath={next ?? "/admin/classes"} />
        </div>
      </Container>
    </section>
  );
}
