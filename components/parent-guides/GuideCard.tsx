import Link from "next/link";
import {
  guideHref,
  parentGuidesHub,
  type ParentGuide,
} from "@/lib/parent-guides";

// One card per guide. A live guide is one big link. A guide still in review
// shows its question and summary, with no link, so nobody lands on a page
// that does not exist yet.
export default function GuideCard({
  guide,
  as: Heading = "h2",
}: {
  guide: ParentGuide;
  as?: "h2" | "h3";
}) {
  if (guide.status !== "live") {
    return (
      <div className="flex h-full flex-col rounded-xl border border-dashed border-[#B9C6D6] bg-white/45 p-6 md:p-7">
        <Heading className="font-serif text-[1.2rem] md:text-[1.3rem] leading-snug text-deep-ink">
          {guide.title}
        </Heading>
        <p className="mt-3 text-[0.925rem] leading-[1.7] text-slate">
          {guide.cardSummary}
        </p>
        <span className="mt-auto inline-flex w-fit items-center gap-2 pt-5 font-sans text-[0.8rem] font-semibold text-slate">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full border border-slate"
          />
          {parentGuidesHub.comingLabel}
        </span>
      </div>
    );
  }

  return (
    <Link
      href={guideHref(guide.slug)}
      className="group relative flex h-full flex-col rounded-xl border border-blue-gray bg-white p-6 shadow-[0_1px_0_rgba(20,33,61,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-navy/40 hover:shadow-[0_16px_36px_rgba(20,33,61,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 md:p-7"
    >
      <Heading className="font-serif text-[1.2rem] md:text-[1.3rem] leading-snug text-deep-ink">
        {guide.title}
      </Heading>
      <p className="mt-3 text-[0.925rem] leading-[1.7] text-slate">
        {guide.cardSummary}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-sans text-[0.9rem] font-semibold text-navy">
        {parentGuidesHub.readLabel}
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </Link>
  );
}
