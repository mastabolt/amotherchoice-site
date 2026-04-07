export function formatDateRange(startDate: Date | string, endDate: Date | string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startFormatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(start);

  const endFormatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(end);

  return `${startFormatted} - ${endFormatted}`;
}

export function formatCurrencyFromCents(amountInCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amountInCents / 100);
}

export function formatSessionStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
