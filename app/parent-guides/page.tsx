import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import GuideRow from "@/components/parent-guides/GuideRow";
import GuidesClosingCTA from "@/components/parent-guides/GuidesClosingCTA";
import {
  PARENT_GUIDES_PATH,
  guideHref,
  GUIDE_STAGES,
  HUB_PARENT_QUESTIONS,
  guidesByStage,
  liveGuides,
  parentGuidesHub as hub,
} from "@/lib/parent-guides";

export const metadata: Metadata = buildMetadata({
  title: "Parent Guides | Beacon House",
  description: `${hub.title} ${hub.intro[0]}`,
  path: PARENT_GUIDES_PATH,
});

const hubJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Parent Guides",
  description: hub.intro.join(" "),
  url: `${SITE_URL}${PARENT_GUIDES_PATH}`,
  isPartOf: { "@type": "WebSite", name: "Beacon House", url: SITE_URL },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: liveGuides().map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}${guideHref(g.slug)}`,
      name: g.title,
    })),
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Parent Guides",
      item: `${SITE_URL}${PARENT_GUIDES_PATH}`,
    },
  ],
};

export default function ParentGuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([hubJsonLd, breadcrumbJsonLd]),
        }}
      />

      {/* Opening. Margin: where you are. Text: the headline and Vishy's framing. */}
      <section className="about-gradient-ivory w-full">
        <div className="mx-auto max-w-content px-6 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36 lg:px-12">
          <div className="ed-grid gap-y-4">
            <p className="ed-margin font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-navy lg:pt-4">
              {hub.eyebrow}
            </p>
            <h1 className="ed-wide font-serif text-[2.2rem] font-medium leading-[1.08] text-deep-ink md:text-[3rem] xl:text-[3.4rem]">
              <span className="md:block">Make informed decisions </span>
              <span className="md:block">at the moments that matter.</span>
            </h1>
            <div className="ed-text mt-4 space-y-3">
              {hub.intro.map((p) => (
                <p key={p} className="text-[1.05rem] leading-[1.75] text-slate">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* The parents' own questions. The quote mark in the margin marks their voice. */}
          <div className="ed-grid mt-14 md:mt-16">
            <span
              aria-hidden="true"
              className="ed-margin hidden select-none font-serif text-[6rem] leading-[0.8] text-[var(--bh-warm-amber)] lg:block lg:text-right"
            >
              “
            </span>
            <ul
              aria-label="Questions parents ask us"
              className="ed-wide grid gap-x-12 gap-y-7 border-t border-blue-gray pt-8 sm:grid-cols-2"
            >
              {HUB_PARENT_QUESTIONS.map((q, i) => (
                <li key={q.slug} className={i > 1 ? "hidden sm:block" : ""}>
                  <Link href={guideHref(q.slug)} className="group block">
                    <span className="font-serif text-[1.25rem] italic leading-[1.4] text-deep-ink decoration-[var(--bh-warm-amber)] decoration-2 underline-offset-[5px] group-hover:text-navy group-hover:underline md:text-[1.4rem]">
                      <span aria-hidden="true" className="not-italic text-[var(--bh-warm-amber)] lg:hidden">“</span>
                      {q.text.split(" ").slice(0, -1).join(" ")}{" "}
                      <span className="whitespace-nowrap">
                        {q.text.split(" ").slice(-1)[0]}
                        <span aria-hidden="true" className="ml-2 inline-block not-italic text-navy transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="start-here" className="w-full bg-white">
        <div className="mx-auto max-w-content px-6 py-16 md:px-8 md:py-24 lg:px-12">
          {/* Three kinds of student, each a way into one guide. */}
          <div className="ed-grid">
            <div className="ed-text">
              <h2
                id="start-here"
                className="font-serif text-[1.75rem] leading-[1.15] text-deep-ink md:text-[2.4rem]"
              >
                {hub.startTitle}
              </h2>

              <ul className="mt-8 border-b border-blue-gray">
                {hub.startSituations.map((s) => (
                  <li key={s.key} className="border-t border-blue-gray">
                    <Link href={guideHref(s.slug)} className="group flex items-start justify-between gap-6 py-5">
                      <p className="text-[1.05rem] leading-[1.7] text-slate">
                        {s.before}
                        <span className="pr-[0.12em] font-serif text-[1.2em] italic text-navy decoration-[var(--bh-warm-amber)] decoration-2 underline-offset-4 group-hover:underline">
                          {s.key}
                        </span>
                        {s.after}
                      </p>
                      <span aria-hidden="true" className="mt-1 text-[1.1rem] text-navy transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-12 font-serif text-[1.4rem] leading-[1.4] text-deep-ink [text-wrap:balance] md:text-[1.65rem]">
                {hub.startBody[1]}
              </p>
              <p className="mt-3 text-[1rem] leading-[1.7] text-slate">{hub.startBody[2]}</p>
            </div>
          </div>

          {/* The school-year spine runs down the margin. Each stage label stays
              in view while its guides pass. */}
          <div className="relative mt-14 md:mt-20">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[5px] top-[10px] w-[2px] bg-[rgba(32,58,107,0.22)] lg:top-[38px]"
            />
            {GUIDE_STAGES.map((stage) => (
              <section
                key={stage.id}
                aria-label={stage.label}
                className="ed-grid relative pb-12 last:pb-0 md:pb-16 [&:last-child>ul]:border-b"
              >
                <div className="ed-margin">
                  <div className="flex items-center gap-4 bg-white py-1 lg:sticky lg:top-[96px] lg:mt-[26px]">
                    <span
                      aria-hidden="true"
                      className={`relative z-10 h-[13px] w-[13px] flex-shrink-0 rounded-full border-2 border-navy ${
                        stage.id === "any" ? "bg-white" : "bg-navy"
                      }`}
                    />
                    <p className="font-sans text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-navy">
                      {stage.label}
                    </p>
                  </div>
                </div>
                <ul className="ed-wide mt-4 border-blue-gray pl-[29px] lg:mt-0 lg:pl-0">
                  {guidesByStage(stage.id).map((guide) => (
                    <li key={guide.slug}>
                      <GuideRow guide={guide} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <GuidesClosingCTA />
    </>
  );
}
