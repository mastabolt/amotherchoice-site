"use client";

import { useActionState } from "react";
import { loginAdminAction, type LoginFormState } from "@/app/admin/login/actions";

const initialState: LoginFormState = {};

export function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const [state, formAction, pending] = useActionState(loginAdminAction, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <input type="hidden" name="next" value={nextPath.startsWith("/admin") ? nextPath : "/admin/classes"} />

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-800">Admin email</span>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-800">Password</span>
        <input
          type="password"
          name="password"
          required
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
        />
      </label>

      {state.error ? <p className="text-sm font-medium text-red-700">{state.error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-mauve)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-mauve-dark)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}
