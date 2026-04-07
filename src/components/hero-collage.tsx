import Image from "next/image";

export function HeroCollage() {
  return (
    <div className="grid h-[190px] grid-cols-[1.25fr_0.75fr] gap-3 sm:h-[230px]">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <Image
          src="/mother-baby-hero.png"
          alt="Mother holding her baby"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="grid gap-3">
        <div className="relative overflow-hidden rounded-[1.5rem]">
          <Image
            src="/secondary-hero-warmth.png"
            alt="Warm motherhood support moment"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 25vw"
            priority
          />
        </div>
        <div className="rounded-[1.5rem] bg-[var(--color-blush)] p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-mauve)]">
            Warmth + Care
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700 sm:text-[15px]">
            Support for families and education for professionals in one welcoming place.
          </p>
        </div>
      </div>
    </div>
  );
}
