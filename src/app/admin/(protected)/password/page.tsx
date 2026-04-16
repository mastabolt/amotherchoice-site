import { updateOwnPasswordAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string; error?: string }>;
}) {
  const { updated, error } = await searchParams;

  const errorMessage =
    error === "current"
      ? "Your current password was incorrect."
      : error === "match"
        ? "Your new passwords did not match."
        : error === "length"
          ? "Your new password must be at least 8 characters long."
          : null;

  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Password</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-900">Change your password</h2>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Update your administrator password here whenever you need to.
      </p>

      {updated ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Your password was updated successfully.
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{errorMessage}</div>
      ) : null}

      <form action={updateOwnPasswordAction} className="mt-8 space-y-6">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">Current password</span>
          <input
            type="password"
            name="currentPassword"
            required
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">New password</span>
          <input
            type="password"
            name="newPassword"
            required
            minLength={8}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">Confirm new password</span>
          <input
            type="password"
            name="confirmPassword"
            required
            minLength={8}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          />
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-mauve)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-mauve-dark)]"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
