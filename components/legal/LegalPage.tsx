import type { ReactNode } from "react";

// Shared building blocks for the legal pages (Privacy Policy, Terms &
// Conditions). Server components, styled with brand tokens to match the
// site's section-header and reading-column conventions.

export function LegalHero({
  eyebrow,
  headline,
  subline,
}: {
  eyebrow: string;
  headline: ReactNode;
  subline: string;
}) {
  return (
    <section className="hero-gradient-bg w-full">
      <div className="max-w-content mx-auto w-full px-6 md:px-8 lg:px-12 pt-[108px] pb-14 md:pt-[130px] md:pb-16 lg:pt-[148px] lg:pb-20">
        <div className="max-w-[820px] mx-auto text-center">
          <span className="inline-block font-sans text-[0.65rem] md:text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--bh-slate-text)] mb-4 md:mb-5">
            {eyebrow}
          </span>
          <h1
            className="font-serif font-medium tracking-tight text-[var(--bh-deep-ink)]"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.25rem)", lineHeight: "1.1" }}
          >
            {headline}
          </h1>
          <div className="w-10 h-[2px] bg-[var(--bh-warm-amber)] mx-auto mt-7 md:mt-8 mb-5 md:mb-6" />
          <p className="font-sans text-[var(--bh-slate-text)] text-[1rem] md:text-[1.1rem] leading-[1.7]">
            {subline}
          </p>
        </div>
      </div>
    </section>
  );
}

export function LegalBody({
  lastUpdated,
  children,
}: {
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <section className="w-full bg-[var(--bh-warm-ivory)]">
      <div className="max-w-text mx-auto w-full px-6 md:px-8 lg:px-12 pt-10 md:pt-14 pb-16 md:pb-20 lg:pb-24">
        <p className="font-sans text-xs uppercase tracking-[0.15em] text-[var(--bh-slate-text)] mb-10 md:mb-12">
          Last updated: {lastUpdated}
        </p>
        <div className="space-y-10 md:space-y-12">{children}</div>
      </div>
    </section>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4 md:mb-5">
        <div className="w-[3px] h-6 bg-[var(--bh-warm-amber)] rounded-full flex-shrink-0" />
        <h2 className="font-serif text-[1.35rem] md:text-[1.6rem] font-medium text-[var(--bh-deep-ink)]">
          {title}
        </h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-[0.95rem] md:text-[1rem] text-[var(--bh-slate-text)] leading-[1.75]">
      {children}
    </p>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 pl-1">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-5 font-sans text-[0.95rem] md:text-[1rem] text-[var(--bh-slate-text)] leading-[1.7]"
        >
          <span className="absolute left-0 top-[0.65em] w-1.5 h-1.5 rounded-full bg-[var(--bh-warm-amber)]" />
          {item}
        </li>
      ))}
    </ul>
  );
}
