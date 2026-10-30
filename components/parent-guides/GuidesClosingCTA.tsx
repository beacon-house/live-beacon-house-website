import Link from "next/link";
import CTAButton from "@/components/shared/CTAButton";
import { parentGuidesHub } from "@/lib/parent-guides";

// Vishy's closing block, on the same grid as the page above it.
// id="final-cta" hides the header and mobile sticky CTAs while this block is
// on screen, so only one primary CTA shows.
export default function GuidesClosingCTA() {
  const { closing } = parentGuidesHub;
  return (
    <section id="final-cta" className="w-full bg-deep-ink">
      <div className="mx-auto max-w-content px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="ed-grid">
          <div className="ed-text">
            <h2 className="font-serif text-[1.75rem] leading-[1.2] text-white [text-wrap:balance] md:text-[2.4rem]">
              {closing.title}
            </h2>
            <div className="mt-5 space-y-4">
              {closing.body.map((p) => (
                <p key={p} className="text-[1rem] leading-[1.8] text-white/85 md:text-[1.05rem]">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
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
        </div>
      </div>
    </section>
  );
}
