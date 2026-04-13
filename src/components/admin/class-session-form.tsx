import { ClassSessionRecord } from "@/lib/class-sessions";

type ClassSessionFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  initialValues?: ClassSessionRecord;
};

function formatDateInput(value: Date) {
  return value.toISOString().slice(0, 10);
}

function formatPriceInput(priceInCents: number) {
  return (priceInCents / 100).toFixed(2);
}

export function ClassSessionForm({ action, submitLabel, initialValues }: ClassSessionFormProps) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-800">Title</span>
          <input
            type="text"
            name="title"
            required
            defaultValue={initialValues?.title ?? ""}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-800">Description</span>
          <textarea
            name="description"
            required
            rows={6}
            defaultValue={initialValues?.description ?? ""}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">Start date</span>
          <input
            type="date"
            name="startDate"
            required
            defaultValue={initialValues ? formatDateInput(initialValues.startDate) : ""}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">End date</span>
          <input
            type="date"
            name="endDate"
            required
            defaultValue={initialValues ? formatDateInput(initialValues.endDate) : ""}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">Duration (days)</span>
          <input
            type="number"
            name="durationDays"
            min="1"
            required
            defaultValue={initialValues?.durationDays ?? 1}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">Price (USD)</span>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            required
            defaultValue={initialValues ? formatPriceInput(initialValues.price) : ""}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">Capacity</span>
          <input
            type="number"
            name="capacity"
            min="1"
            required
            defaultValue={initialValues?.capacity ?? 1}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">Status</span>
          <select
            name="status"
            defaultValue={initialValues?.status ?? "open"}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
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
