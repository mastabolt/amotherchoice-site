import Link from "next/link";
import { createClassSessionAction } from "@/app/admin/actions";
import { ClassSessionForm } from "@/components/admin/class-session-form";

export const dynamic = "force-dynamic";

export default function AdminNewClassPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">New Class Session</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Create a class session</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          Add a new training or support session using dollars for pricing. The app stores pricing in cents automatically.
        </p>
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
        <ClassSessionForm action={createClassSessionAction} submitLabel="Create Class Session" />
      </div>

      <Link href="/admin/classes" className="text-sm font-semibold text-[var(--color-mauve-dark)] hover:text-[var(--color-mauve)]">
        ← Back to classes
      </Link>
    </div>
  );
}
