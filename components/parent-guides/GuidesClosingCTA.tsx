import Link from "next/link";
import CTAButton from "@/components/shared/CTAButton";
import { parentGuidesHub } from "@/lib/parent-guides";

// Vishy's closing block. id="final-cta" hides the header and mobile sticky
// CTAs while this block is on screen, so only one primary CTA shows.
export default function GuidesClosingCTA() {
  const { closing } = parentGuidesHub;
  return (
    <section id="final-cta" className="w-full bg-deep-ink">
      <div className="mx-auto grid max-w-content gap-8 px-6 py-16 md:px-8 md:py-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-12">
        <div className="lg:col-span-7">
          <h2 className="font-serif text-[1.75rem] leading-[1.2] text-white md:text-[2.4rem]">
            {closing.title}
          </h2>
          <div className="mt-5 space-y-4">
            {closing.body.map((p) => (
              <p key={p} className="text-[1rem] leading-[1.8] text-white/85 md:text-[1.05rem]">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-5 lg:col-span-5 lg:items-end">
          <CTAButton className="w-full sm:w-auto" />
          <Link
            href={closing.secondaryHref}
            className="group inline-flex items-center gap-1.5 font-sans text-[0.95rem] font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            {closing.secondaryLabel}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
