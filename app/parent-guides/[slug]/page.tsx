import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import GuideMarkdown from "@/components/parent-guides/GuideMarkdown";
import GuideCard from "@/components/parent-guides/GuideCard";
import GuidesClosingCTA from "@/components/parent-guides/GuidesClosingCTA";
import GuideTocRail from "@/components/parent-guides/GuideTocRail";
import {
  GUIDE_AUTHOR,
  PARENT_GUIDES_PATH,
  getGuide,
  guideHref,
} from "@/lib/parent-guides";
import {
  allGuideSlugs,
  loadGuideContent,
  nextGuides,
  readingMinutes,
} from "@/lib/guide-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return allGuideSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const url = `${SITE_URL}${guideHref(slug)}`;
  const title = `${guide.title} | Beacon House`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: guide.cardSummary,
    alternates: { canonical: url },
    authors: [{ name: GUIDE_AUTHOR.name, url: GUIDE_AUTHOR.linkedIn }],
    openGraph: {
      title,
      description: guide.cardSummary,
      url,
      siteName: "Beacon House",
      type: "article",
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified ?? guide.datePublished,
      authors: [GUIDE_AUTHOR.linkedIn],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: guide.cardSummary,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const content = loadGuideContent(slug);
  const minutes = readingMinutes(content.wordCount);
  const url = `${SITE_URL}${guideHref(slug)}`;
  const toc = [
    ...content.sections.map((s) => ({ id: s.id, title: s.title })),
    ...(content.sources ? [{ id: "sources", title: "Sources" }] : []),
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.cardSummary,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified ?? guide.datePublished,
    wordCount: content.wordCount,
    inLanguage: "en-IN",
    author: {
      "@type": "Person",
      name: GUIDE_AUTHOR.name,
      jobTitle: GUIDE_AUTHOR.jobTitle,
      image: `${SITE_URL}${GUIDE_AUTHOR.photo}`,
      sameAs: [GUIDE_AUTHOR.linkedIn],
      worksFor: { "@type": "Organization", name: "Beacon House", url: SITE_URL },
    },
    publisher: {
      "@type": "Organization",
      name: "Beacon House",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/bh-ig-logo.png` },
    },
    isPartOf: {
      "@type": "CollectionPage",
      name: "Parent Guides",
      url: `${SITE_URL}${PARENT_GUIDES_PATH}`,
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
      { "@type": "ListItem", position: 3, name: guide.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]),
        }}
      />

      {/* Opening: the question, who wrote it, the premise and the short answer. */}
      <header className="about-gradient-ivory w-full">
        <div className="mx-auto max-w-content px-6 pb-12 pt-24 md:px-8 md:pb-16 md:pt-28 lg:px-12">
          <nav aria-label="Breadcrumb" className="font-sans text-[0.85rem]">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate">
              <li>
                <Link href={PARENT_GUIDES_PATH} className="font-semibold text-navy underline-offset-4 hover:underline">
                  Parent Guides
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="truncate max-w-[60vw] md:max-w-none">
                {guide.title}
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h1 className="font-serif text-[2rem] font-medium leading-[1.14] text-deep-ink md:text-[2.75rem] lg:text-[3rem]">
                {guide.title}
              </h1>

              <div className="mt-6 flex items-center gap-3.5">
                <Image
                  src={GUIDE_AUTHOR.photo}
                  alt={GUIDE_AUTHOR.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border border-blue-gray object-cover"
                  priority
                />
                <div className="font-sans text-[0.9rem] leading-snug">
                  <p className="text-deep-ink">
                    By <span className="font-semibold">{GUIDE_AUTHOR.name}</span>, {GUIDE_AUTHOR.role}
                  </p>
                  <p className="mt-0.5 text-slate">{minutes} min read</p>
                </div>
              </div>

              <div className="mt-8 max-w-[65ch]">
                <GuideMarkdown>{content.intro}</GuideMarkdown>
              </div>
            </div>

            <aside
              aria-labelledby="short-answer"
              className="hero-cta lg:col-span-5 lg:self-start"
            >
              <div className="rounded-xl border border-blue-gray border-l-[3px] border-l-navy bg-white p-6 shadow-[0_18px_40px_rgba(20,33,61,0.07)] md:p-8">
                <h2
                  id="short-answer"
                  className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-navy"
                >
                  The short answer
                </h2>
                <div className="mt-4 [&_p]:text-[1.05rem] [&_p]:leading-[1.75] [&_p]:text-deep-ink md:[&_p]:text-[1.1rem]">
                  <GuideMarkdown>{content.shortAnswer}</GuideMarkdown>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* Body: contents rail and the guide. */}
      <div className="w-full bg-white">
        <div className="mx-auto grid max-w-content gap-10 px-6 py-12 md:px-8 md:py-16 lg:grid-cols-12 lg:gap-14 lg:px-12">
          <nav aria-label="In this guide" className="lg:col-span-3">
            <details className="group rounded-xl border border-blue-gray bg-blue-mist/60 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-sans text-[0.95rem] font-semibold text-deep-ink">
                In this guide
                <span aria-hidden="true" className="text-navy transition-transform group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <ol className="space-y-1 border-t border-blue-gray px-5 py-3">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="block py-1.5 text-[0.92rem] leading-snug text-slate hover:text-navy">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <GuideTocRail items={toc} />
          </nav>

          <article className="min-w-0 lg:col-span-9 lg:max-w-[720px]">
            {content.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id} className="mt-12 first:mt-0">
                <h2
                  id={section.id}
                  className="scroll-mt-28 font-serif text-[1.6rem] leading-[1.25] text-deep-ink md:text-[2rem]"
                >
                  {section.title}
                </h2>
                <div className="mt-5">
                  <GuideMarkdown>{section.markdown}</GuideMarkdown>
                </div>
              </section>
            ))}

            {content.sources && (
              <section aria-labelledby="sources" className="mt-14 border-t border-blue-gray pt-10">
                <h2 id="sources" className="scroll-mt-28 font-serif text-[1.35rem] text-deep-ink">
                  Sources
                </h2>
                {content.sources.preface && (
                  <p className="mt-3 text-[0.92rem] leading-[1.7] text-slate">
                    {content.sources.preface}
                  </p>
                )}
                <ol className="mt-5 space-y-3">
                  {content.sources.items.map((item, i) => (
                    <li
                      key={i}
                      id={`source-${i + 1}`}
                      className="flex scroll-mt-28 gap-3 text-[0.92rem] leading-[1.65] text-slate [&_a]:text-[0.92rem] [&_p]:!mt-0 [&_p]:!text-[0.92rem] [&_p]:!leading-[1.65]"
                    >
                      <span className="w-6 flex-shrink-0 font-sans font-semibold text-navy">{i + 1}.</span>
                      <div className="min-w-0 break-words">
                        <GuideMarkdown>{item}</GuideMarkdown>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <section
              aria-labelledby="about-author"
              className="mt-14 rounded-xl border border-blue-gray bg-blue-mist p-6 md:p-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <Image
                  src={GUIDE_AUTHOR.photo}
                  alt={GUIDE_AUTHOR.name}
                  width={88}
                  height={88}
                  className="h-20 w-20 flex-shrink-0 rounded-full border border-blue-gray object-cover md:h-[88px] md:w-[88px]"
                />
                <div>
                  <h2 id="about-author" className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-navy">
                    About the author
                  </h2>
                  <div className="mt-3 [&_p]:!text-[0.98rem] [&_p]:!leading-[1.75]">
                    <GuideMarkdown>{content.authorBio}</GuideMarkdown>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>

      <section aria-labelledby="more-guides" className="w-full border-t border-blue-gray bg-blue-mist">
        <div className="mx-auto max-w-content px-6 py-14 md:px-8 md:py-16 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="more-guides" className="font-serif text-[1.6rem] leading-tight text-deep-ink md:text-[2rem]">
              More Parent Guides
            </h2>
            <Link href={PARENT_GUIDES_PATH} className="font-sans text-[0.95rem] font-semibold text-navy underline decoration-[var(--bh-warm-amber)] decoration-2 underline-offset-4">
              All Parent Guides
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {nextGuides(slug).map((g) => (
              <li key={g.slug} className="flex">
                <div className="w-full">
                  <GuideCard guide={g} as="h3" />
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
