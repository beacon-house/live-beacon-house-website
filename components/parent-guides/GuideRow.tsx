import Link from "next/link";
import {
  guideHref,
  parentGuidesHub,
  type ParentGuide,
} from "@/lib/parent-guides";

// One guide as an index row: the question on the left, what it covers on the
// right, the action at the end. Rows share one rhythm, so the list never
// leaves holes the way uneven card columns do.
export default function GuideRow({ guide }: { guide: ParentGuide }) {
  const grid =
    "grid gap-2 border-t border-blue-gray py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-x-10 md:py-7";

  if (guide.status !== "live") {
    return (
      <div className={grid}>
        <h3 className="font-serif text-[1.2rem] italic leading-snug text-[#66748A] [text-wrap:balance] md:text-[1.3rem]">
          {guide.title}
        </h3>
        <div>
          <p className="text-[0.875rem] leading-[1.65] text-[#66748A]">{guide.cardSummary}</p>
          <p className="mt-3 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#66748A]">
            {parentGuidesHub.comingLabel}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={guideHref(guide.slug)}
      className={`group ${grid} transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy`}
    >
      <h3 className="font-serif text-[1.2rem] leading-snug text-deep-ink decoration-[var(--bh-warm-amber)] decoration-2 underline-offset-[5px] [text-wrap:balance] group-hover:text-navy group-hover:underline md:text-[1.3rem]">
        {guide.title}
      </h3>
      <div>
        <p className="text-[0.875rem] leading-[1.65] text-slate">{guide.cardSummary}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-navy">
          {parentGuidesHub.readLabel}
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
