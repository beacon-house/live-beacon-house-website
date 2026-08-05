import type { ReactNode } from "react";

// Shared layout for the legal pages (Privacy Policy, Terms & Conditions).
// Server component, styled with brand tokens. Desktop uses an asymmetric
// two-column body: a sticky index rail (last-updated + jump links) beside a
// width-constrained reading column. On mobile the rail collapses and the
// content reads as a single column.

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

export function LegalPageLayout({
  eyebrow,
  headline,
  subline,
  lastUpdated,
  lead,
  sections,
}: {
  eyebrow: string;
  headline: ReactNode;
  subline: string;
  lastUpdated: string;
  lead: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient-bg w-full">
        <div className="max-w-content mx-auto w-full px-6 md:px-8 lg:px-12 pt-[104px] pb-10 md:pt-[128px] md:pb-12 lg:pt-[140px] lg:pb-14">
          <div className="max-w-[760px] mx-auto text-center">
            <span className="inline-block font-sans text-[0.65rem] md:text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--bh-slate-text)] mb-4 md:mb-5">
              {eyebrow}
            </span>
            <h1
              className="font-serif font-medium tracking-tight text-[var(--bh-deep-ink)]"
              style={{
                fontSize: "clamp(2.25rem, 5.5vw, 3.25rem)",
                lineHeight: "1.1",
              }}
            >
              {headline}
            </h1>
            <div className="w-10 h-[2px] bg-[var(--bh-warm-amber)] mx-auto mt-6 md:mt-7 mb-5" />
            <p className="font-sans text-[var(--bh-slate-text)] text-[1rem] md:text-[1.1rem] leading-[1.7]">
              {subline}
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="w-full bg-[var(--bh-warm-ivory)]">
        <div className="max-w-content mx-auto w-full px-6 md:px-8 lg:px-12 pt-10 md:pt-12 lg:pt-16 pb-16 md:pb-20 lg:pb-24">
          <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14 xl:gap-20">
            {/* Index rail — sticky on desktop, hidden on mobile */}
            <aside className="hidden lg:block">
              <div className="sticky top-[100px]">
                <p className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-[var(--bh-slate-text)]/70">
                  Last updated
                </p>
                <p className="font-sans text-sm text-[var(--bh-deep-ink)] font-medium mt-1 mb-8">
                  {lastUpdated}
                </p>
                <p className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-[var(--bh-slate-text)]/70 mb-4">
                  On this page
                </p>
                <nav aria-label="On this page">
                  <ul className="space-y-2.5 border-l border-[var(--bh-border-blue-gray)]">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="block -ml-px border-l-2 border-transparent pl-4 font-sans text-[0.85rem] leading-snug text-[var(--bh-slate-text)] hover:text-[var(--bh-navy)] hover:border-[var(--bh-warm-amber)] transition-colors"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Reading column */}
            <div className="max-w-[680px]">
              {/* Last-updated shown inline on mobile only */}
              <p className="lg:hidden font-sans text-xs uppercase tracking-[0.15em] text-[var(--bh-slate-text)] mb-8">
                Last updated: {lastUpdated}
              </p>

              <div className="font-sans text-[0.95rem] md:text-[1rem] text-[var(--bh-slate-text)] leading-[1.75] space-y-4">
                {lead}
              </div>

              <div className="mt-12 md:mt-14 space-y-10 md:space-y-12">
                {sections.map((s) => (
                  <div key={s.id} id={s.id} className="scroll-mt-[100px]">
                    <div className="flex items-center gap-3 mb-4 md:mb-5">
                      <div className="w-[3px] h-6 bg-[var(--bh-warm-amber)] rounded-full flex-shrink-0" />
                      <h2 className="font-serif text-[1.35rem] md:text-[1.6rem] font-medium text-[var(--bh-deep-ink)]">
                        {s.title}
                      </h2>
                    </div>
                    <div className="space-y-4">{s.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
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
