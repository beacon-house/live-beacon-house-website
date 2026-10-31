import Link from "next/link";
import {
  guideHref,
  parentGuidesHub,
  type ParentGuide,
} from "@/lib/parent-guides";

// One guide as a card: the question, what it covers, the action at the foot.
// Every guide on the hub uses this one shape. A guide that is not live keeps
// the same shape, greyed, with no link.
export default function GuideCard({ guide }: { guide: ParentGuide }) {
  const shell =
    "flex h-full flex-col rounded-xl border p-6 md:p-7";

  if (guide.status !== "live") {
    return (
      <div className={`${shell} border-dashed border-[#C9D3DF] bg-transparent`}>
        <h3 className="font-serif text-[1.2rem] leading-snug text-[#66748A] [text-wrap:balance] md:text-[1.3rem]">
          {guide.title}
        </h3>
        <p className="mt-3 text-[0.9rem] leading-[1.65] text-[#66748A]">{guide.cardSummary}</p>
        <p className="mt-auto pt-5 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#66748A]">
          {parentGuidesHub.comingLabel}
        </p>
      </div>
    );
  }

  return (
    <Link
      href={guideHref(guide.slug)}
      className={`group ${shell} border-blue-gray bg-white transition-[border-color,box-shadow] duration-200 hover:border-navy hover:shadow-[0_8px_24px_rgba(20,33,61,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy`}
    >
      <h3 className="font-serif text-[1.2rem] leading-snug text-deep-ink [text-wrap:balance] group-hover:text-navy md:text-[1.3rem]">
        {guide.title}
      </h3>
      <p className="mt-3 text-[0.9rem] leading-[1.65] text-slate">{guide.cardSummary}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-navy">
        {parentGuidesHub.readLabel}
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
