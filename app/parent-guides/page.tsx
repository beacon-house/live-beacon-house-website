import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import GuideCard from "@/components/parent-guides/GuideCard";
import GuidesClosingCTA from "@/components/parent-guides/GuidesClosingCTA";
import {
  PARENT_GUIDES_PATH,
  guideHref,
  liveGuides,
  parentGuides,
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

      <section className="about-gradient-ivory w-full">
        <div className="mx-auto grid max-w-content gap-10 px-6 pb-16 pt-28 md:px-8 md:pb-24 md:pt-28 lg:grid-cols-12 lg:gap-12 lg:px-12">
          {/* Left: Vishy's framing stays in view while the questions scroll. */}
          <div className="lg:col-span-5 lg:self-start [@media(min-width:1024px)_and_(min-height:860px)]:sticky [@media(min-width:1024px)_and_(min-height:860px)]:top-[96px]">
            <p className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-navy">
              {hub.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-[2.1rem] font-medium leading-[1.12] text-deep-ink md:text-[2.75rem] lg:text-[2.25rem] xl:text-[2.4rem]">
              {hub.title}
            </h1>
            <div className="mt-4 h-0.5 w-12 bg-[var(--bh-warm-amber)]" />
            <div className="mt-4 space-y-2.5">
              {hub.intro.map((p) => (
                <p key={p} className="text-[1rem] leading-[1.7] text-slate lg:text-[0.95rem] lg:leading-[1.65]">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-6 border-t border-blue-gray pt-5">
              <h2 className="font-serif text-[1.3rem] leading-snug text-deep-ink md:text-[1.4rem] lg:text-[1.2rem]">
                {hub.startTitle}
              </h2>
              <div className="mt-2.5 space-y-2.5">
                {hub.startBody.map((p) => (
                  <p key={p} className="text-[0.95rem] leading-[1.7] text-slate lg:text-[0.9rem] lg:leading-[1.6]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right: the questions. */}
          <ul
            className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5"
            aria-label="Parent guides"
          >
            {parentGuides.map((guide) => (
              <li key={guide.slug} className="flex">
                <div className="w-full">
                  <GuideCard guide={guide} as="h3" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GuidesClosingCTA />
    </>
  );
}
