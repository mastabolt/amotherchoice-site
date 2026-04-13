import { AdminUserRecord } from "@/lib/admin-users";

type AdminUserFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  initialValues?: AdminUserRecord;
};

export function AdminUserForm({ action, submitLabel, initialValues }: AdminUserFormProps) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-800">Email</span>
          <input
            type="email"
            name="email"
            required
            defaultValue={initialValues?.email ?? ""}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-800">
            {initialValues ? "New password (leave blank to keep current password)" : "Password"}
          </span>
          <input
            type="password"
            name="password"
            required={!initialValues}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">Status</span>
          <select
            name="isActive"
            defaultValue={initialValues ? String(initialValues.isActive) : "true"}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-[var(--color-mauve)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-mauve-dark)]"
      >
        {submitLabel}
      </button>
    </form>
  );
}
