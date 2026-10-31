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

      {/* One fold of Vishy's framing, read top to bottom, then the guides. */}
      <section className="about-gradient-ivory w-full">
        <div className="mx-auto max-w-content px-6 pb-14 pt-28 md:px-8 md:pb-16 md:pt-32 lg:px-12">
          <div className="ed-grid gap-y-4">
            <p className="ed-margin font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-navy lg:pt-4">
              {hub.eyebrow}
            </p>
            <h1 className="ed-wide font-serif text-[2.2rem] font-medium leading-[1.08] text-deep-ink md:text-[3rem] xl:text-[3.4rem]">
              <span className="md:block">Make informed decisions </span>
              <span className="md:block">at the moments that matter.</span>
            </h1>
            <div className="ed-text mt-3 space-y-3 text-[1.02rem] leading-[1.7] text-slate">
              {hub.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="ed-text mt-6">
              <h2 className="font-serif text-[1.4rem] leading-[1.25] text-deep-ink md:text-[1.6rem]">
                {hub.startTitle}
              </h2>
              <div className="mt-3 space-y-3 text-[1.02rem] leading-[1.7] text-slate">
                {hub.startBody.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="All guides" className="w-full bg-white">
        <div className="mx-auto max-w-content px-6 py-14 md:px-8 md:py-20 lg:px-12">
          {/* The school-year spine runs down the margin. Each class label stays
              in view while its guides pass. */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[5px] top-[10px] w-[2px] bg-[rgba(32,58,107,0.22)]"
            />
            {GUIDE_STAGES.map((stage) => (
              <section
                key={stage.id}
                aria-label={stage.label}
                className="ed-grid relative pb-12 last:pb-0 md:pb-16"
              >
                <div className="ed-margin">
                  <div className="flex items-center gap-4 bg-white py-1 lg:sticky lg:top-[96px]">
                    <span
                      aria-hidden="true"
                      className={`relative z-10 h-[13px] w-[13px] flex-shrink-0 rounded-full border-2 border-navy ${
                        stage.id === "any" ? "bg-white" : "bg-navy"
                      }`}
                    />
                    <h2 className="font-sans text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-navy">
                      {stage.label}
                    </h2>
                  </div>
                </div>
                <ul className="ed-wide mt-4 grid gap-5 pl-[29px] md:grid-cols-2 lg:mt-0 lg:pl-0 xl:grid-cols-3">
                  {guidesByStage(stage.id).map((guide) => (
                    <li key={guide.slug}>
                      <GuideCard guide={guide} />
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
