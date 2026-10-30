import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import GuideCard from "@/components/parent-guides/GuideCard";
import GuidesClosingCTA from "@/components/parent-guides/GuidesClosingCTA";
import {
  PARENT_GUIDES_PATH,
  guideHref,
  GUIDE_STAGES,
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

      {/* Opening: Vishy's framing, wide and short. */}
      <section className="about-gradient-ivory w-full">
        <div className="mx-auto grid max-w-content gap-8 px-6 pb-14 pt-28 md:px-8 md:pb-20 md:pt-36 lg:grid-cols-12 lg:items-end lg:gap-14 lg:px-12">
          <div className="lg:col-span-7">
            <p className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-navy">
              {hub.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-[2.2rem] font-medium leading-[1.1] text-deep-ink md:text-[3rem] lg:text-[3.4rem]">
              {hub.title}
            </h1>
          </div>
          <div className="space-y-3 lg:col-span-5 lg:pb-2">
            {hub.intro.map((p) => (
              <p key={p} className="text-[1rem] leading-[1.75] text-slate md:text-[1.05rem]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* The questions, placed along the school years. */}
      <section aria-labelledby="start-here" className="w-full bg-white">
        <div className="mx-auto max-w-content px-6 py-14 md:px-8 md:py-20 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-14">
            <h2
              id="start-here"
              className="font-serif text-[1.6rem] leading-[1.2] text-deep-ink md:text-[2.1rem] lg:col-span-5"
            >
              {hub.startTitle}
            </h2>
            <div className="space-y-3 lg:col-span-7">
              {hub.startBody.map((p) => (
                <p key={p} className="text-[0.975rem] leading-[1.75] text-slate">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="relative mt-12 md:mt-16">
            {/* The school-year line: across on desktop, down the side on phones. */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[5px] hidden h-[2px] bg-navy/25 lg:block"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[5px] top-[6px] w-[2px] bg-navy/25 lg:hidden"
            />

            <ol className="relative grid gap-14 lg:grid-cols-4 lg:gap-8">
              {GUIDE_STAGES.map((stage) => (
                <li key={stage.id}>
                  <section aria-label={stage.label}>
                    <div className="flex items-center gap-4">
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
                    <ul className="mt-7 space-y-10 pl-[29px] lg:mt-9 lg:pl-0">
                      {guidesByStage(stage.id).map((guide) => (
                        <li key={guide.slug}>
                          <GuideCard guide={guide} as="h3" />
                        </li>
                      ))}
                    </ul>
                  </section>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <GuidesClosingCTA />
    </>
  );
}
