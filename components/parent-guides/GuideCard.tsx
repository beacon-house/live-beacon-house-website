import Link from "next/link";
import {
  guideHref,
  parentGuidesHub,
  type ParentGuide,
} from "@/lib/parent-guides";

// One guide, set as an entry under a hairline rather than a boxed card. A live
// guide is one link. A guide still in review shows its question and summary
// with no link, so nobody lands on a page that does not exist yet.
export default function GuideCard({
  guide,
  as: Heading = "h3",
}: {
  guide: ParentGuide;
  as?: "h2" | "h3";
}) {
  if (guide.status !== "live") {
    return (
      <div className="flex h-full flex-col border-t border-dashed border-[#B9C6D6] pt-5">
        <Heading className="font-serif text-[1.15rem] leading-snug text-slate md:text-[1.2rem]">
          {guide.title}
        </Heading>
        <p className="mt-2.5 text-[0.9rem] leading-[1.65] text-slate/90">
          {guide.cardSummary}
        </p>
        <span className="mt-auto pt-4 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-slate">
          {parentGuidesHub.comingLabel}
        </span>
      </div>
    );
  }

  return (
    <Link
      href={guideHref(guide.slug)}
      className="group relative flex h-full flex-col border-t border-blue-gray pt-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4"
    >
      {/* The hairline thickens to navy on hover, so the whole entry reads as one target. */}
      <span
        aria-hidden="true"
        className="absolute -top-px left-0 h-[2px] w-10 bg-navy transition-all duration-300 group-hover:w-full"
      />
      <Heading className="font-serif text-[1.15rem] leading-snug text-deep-ink transition-colors group-hover:text-navy md:text-[1.2rem]">
        {guide.title}
      </Heading>
      <p className="mt-2.5 text-[0.9rem] leading-[1.65] text-slate">
        {guide.cardSummary}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-sans text-[0.9rem] font-semibold text-navy">
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
