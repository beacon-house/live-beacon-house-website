import type { CareerRole } from "@/lib/careers-data";
import { applyCopy } from "@/lib/careers-data";
import ApplyForm from "./ApplyForm";

function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="block font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--bh-warm-amber)] mb-2">
        {label}
      </span>
      <h2 className="font-serif text-2xl md:text-[1.75rem] leading-tight text-deep-ink">
        {title}
      </h2>
      <div className="mt-3 h-0.5 w-8 bg-[var(--bh-warm-amber)]" />
    </div>
  );
}

/**
 * Full role narrative, top to bottom. Rendered on /careers/[slug].
 * Single column. No sticky rail, no nested containers. The form is the
 * destination at the bottom, not a sidebar.
 */
export default function RoleDetail({ role }: { role: CareerRole }) {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* The work — short bullets. */}
      <section className="max-w-text">
        <SectionHead label="The role" title="The work" />
        <ul className="space-y-3">
          {role.work.map((item) => (
            <li key={item} className="flex gap-3 text-slate leading-[1.7]">
              <span
                aria-hidden
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bh-warm-amber)]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* You will fit if — short bullets, 2-col on sm+. */}
      <section className="max-w-text">
        <SectionHead label="The bar" title="You will fit if" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {role.fitFor.map((item) => (
            <li key={item} className="flex gap-3 text-slate leading-[1.7]">
              <span
                aria-hidden
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bh-warm-amber)]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* How to apply — process, then the question as a single deep-ink callout. */}
      <section>
        <SectionHead label="No cover letter" title="How to apply" />
        <p className="max-w-text text-slate leading-[1.8]">
          {applyCopy.howToApplyIntro}
        </p>

        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {applyCopy.howToApplySteps.map((step, index) => (
            <li key={step} className="flex gap-4 md:flex-col md:gap-4">
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--bh-warm-amber)] to-[var(--bh-warm-amber-light)] font-sans text-lg font-bold text-deep-ink shadow-md"
              >
                {index + 1}
              </span>
              <p className="text-slate leading-[1.75]">{step}</p>
            </li>
          ))}
        </ol>

        {/* The question — one callout, not a box in a box. Deep-ink = the gate. */}
        <div className="mt-10 rounded-xl bg-deep-ink p-6 md:p-8">
          <span className="block font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--bh-warm-amber)] mb-3">
            The question we ask
          </span>
          <p className="font-serif text-xl md:text-2xl leading-[1.4] text-white">
            {role.screen.question}
          </p>
          <p className="mt-4 text-sm leading-[1.7] text-white/70">
            {role.screen.helper}
          </p>
        </div>
      </section>

      {/* Apply — the destination. One white card, contained width. */}
      <ApplyForm role={role} />
    </div>
  );
}
