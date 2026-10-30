import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import GuideMarkdown from "@/components/parent-guides/GuideMarkdown";
import GuideRow from "@/components/parent-guides/GuideRow";
import GuidesClosingCTA from "@/components/parent-guides/GuidesClosingCTA";
import GuideTocRail from "@/components/parent-guides/GuideTocRail";
import GuideMobileBar from "@/components/parent-guides/GuideMobileBar";
import {
  GUIDE_AUTHOR,
  PARENT_GUIDES_PATH,
  getGuide,
  guideHref,
  titleLines,
} from "@/lib/parent-guides";
import {
  allGuideSlugs,
  loadGuideContent,
  nextGuides,
  readingMinutes,
} from "@/lib/guide-content";

export const dynamicParams = false;

// Sections that tell what happened with real students, set apart from advice.
const STORY_SECTIONS = new Set([
  "students-who-found-their-area-of-interest",
  "one-student-over-several-years",
  "the-same-shape-outside-science",
  "examples-from-our-students-work",
  "two-students-two-different-starting-points",
  "two-decisions-we-helped-families-make",
]);

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

      {/* Opening. Margin: where you are and who wrote this. Text: the question,
          the parent's voice, then Beacon House's answer. */}
      <header className="about-gradient-ivory w-full">
        <div className="mx-auto max-w-content px-6 pb-14 pt-24 md:px-8 md:pb-20 md:pt-28 lg:px-12">
          <div className="ed-grid gap-y-5">
            <div className="ed-margin lg:pt-3">
              <nav aria-label="Breadcrumb">
                <Link
                  href={PARENT_GUIDES_PATH}
                  className="group inline-flex items-center gap-1.5 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-navy"
                >
                  <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">←</span>
                  Parent Guides
                </Link>
              </nav>
              <Byline minutes={minutes} className="mt-8 hidden lg:block" />
            </div>

            <h1
              id="guide-title"
              className="ed-wide font-serif text-[2rem] font-medium leading-[1.1] text-deep-ink md:text-[2.75rem] xl:text-[3.1rem]"
            >
              {titleLines(guide.title).map((line) => (
                <span key={line} className="block [text-wrap:pretty]">
                  {line}
                </span>
              ))}
            </h1>
            <Byline minutes={minutes} className="ed-margin lg:hidden" />
          </div>

          <div className="ed-grid mt-12 gap-y-6 md:mt-16">
            {content.opening.kind === "quote" ? (
              <>
                <span
                  aria-hidden="true"
                  className="ed-margin hidden select-none font-serif text-[6rem] leading-[0.75] text-[var(--bh-warm-amber)] lg:block lg:text-right"
                >
                  “
                </span>
                <blockquote className="ed-text">
                  <p className="font-serif text-[1.6rem] italic leading-[1.3] text-deep-ink [text-wrap:balance] md:text-[2rem]">
                    <span aria-hidden="true" className="mr-1 align-[-0.15em] font-serif text-[1.5em] not-italic leading-none text-[var(--bh-warm-amber)] lg:hidden">“</span>
                    {content.opening.text}
                  </p>
                </blockquote>
              </>
            ) : (
              <p className="ed-text font-serif text-[1.5rem] leading-[1.4] text-deep-ink [text-wrap:balance] md:text-[1.8rem]">
                {content.opening.text}
              </p>
            )}

            <div className="ed-text">
              <GuideMarkdown sources={content.sources?.items}>{content.intro}</GuideMarkdown>
            </div>
          </div>

          <section aria-labelledby="short-answer" className="ed-grid mt-14 gap-y-4 md:mt-16">
            <h2
              id="short-answer"
              className="ed-margin font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-navy lg:pt-2"
            >
              <span aria-hidden="true" className="mb-3 block h-[2px] w-8 bg-[var(--bh-warm-amber)]" />
              The short answer
            </h2>
            <div className="hero-cta ed-text short-answer">
              <GuideMarkdown sources={content.sources?.items}>{content.shortAnswer}</GuideMarkdown>
            </div>
          </section>
        </div>
      </header>

      <GuideMobileBar guideTitle={guide.title} items={toc} />

      {/* Body. Margin: the guide and your place in it. Text: the guide.
          Notes (wide screens): the source beside the line it supports. */}
      <div className="w-full bg-white">
        <div className="mx-auto max-w-content px-6 py-14 md:px-8 md:py-20 lg:px-12">
          <div className="ed-grid gap-y-10">
            <nav aria-label="In this guide" className="ed-margin">
              <details className="group border-y border-blue-gray lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-navy">
                  In this guide
                  <span aria-hidden="true" className="text-navy transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <ol className="space-y-1 border-t border-blue-gray py-3">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="block py-1.5 text-[0.92rem] leading-snug text-slate hover:text-navy">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
              <GuideTocRail guideTitle={guide.title} items={toc} />
            </nav>

            <article className="ed-text">
              {content.sections.map((section) => (
                <section key={section.id} aria-labelledby={section.id} className="mt-16 first:mt-0">
                  <h2
                    id={section.id}
                    className="scroll-mt-36 font-serif text-[1.6rem] leading-[1.25] text-deep-ink [text-wrap:balance] md:text-[2rem] lg:scroll-mt-28"
                  >
                    {section.title}
                  </h2>
                  <div className={`mt-5 ${STORY_SECTIONS.has(section.id) ? "guide-story" : ""}`}>
                    <GuideMarkdown sources={content.sources?.items}>{section.markdown}</GuideMarkdown>
                  </div>
                </section>
              ))}

              {content.sources && (
                <section aria-labelledby="sources" className="mt-16 border-t border-blue-gray pt-10">
                  <h2 id="sources" className="scroll-mt-28 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-navy">
                    Sources
                  </h2>
                  {content.sources.preface && (
                    <p className="mt-3 text-[0.9rem] leading-[1.7] text-slate">{content.sources.preface}</p>
                  )}
                  <ol className="mt-5 space-y-3">
                    {content.sources.items.map((item, i) => (
                      <li
                        key={i}
                        id={`source-${i + 1}`}
                        className="flex scroll-mt-28 gap-3 text-[0.9rem] leading-[1.65] text-slate [&_p]:!mt-0 [&_p]:!text-[0.9rem] [&_p]:!leading-[1.65]"
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

              <section aria-labelledby="about-author" className="mt-16 border-t border-blue-gray pt-10">
                <h2 id="about-author" className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-navy">
                  About the author
                </h2>
                <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
                  <Image
                    src={GUIDE_AUTHOR.photo}
                    alt={GUIDE_AUTHOR.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 flex-shrink-0 rounded-full border border-blue-gray object-cover"
                  />
                  <div className="[&_p]:!text-[0.98rem] [&_p]:!leading-[1.75]">
                    <GuideMarkdown>{content.authorBio}</GuideMarkdown>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>

      <GuidesClosingCTA />

      {/* More guides, on the same grid: label in the margin, rows in the text. */}
      <section aria-labelledby="more-guides" className="w-full bg-white">
        <div className="mx-auto max-w-content px-6 py-16 md:px-8 md:py-20 lg:px-12">
          <div className="ed-grid gap-y-6">
            <div className="ed-margin lg:pt-7">
              <h2 id="more-guides" className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-navy">
                More Parent Guides
              </h2>
              <Link
                href={PARENT_GUIDES_PATH}
                className="mt-3 inline-block font-sans text-[0.9rem] font-semibold text-navy underline decoration-[var(--bh-warm-amber)] decoration-2 underline-offset-4"
              >
                All Parent Guides
              </Link>
            </div>
            <ul className="ed-wide border-b border-blue-gray">
              {nextGuides(slug).map((g) => (
                <li key={g.slug}>
                  <GuideRow guide={g} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function Byline({ minutes, className = "" }: { minutes: number; className?: string }) {
  return (
    <div className={`flex items-center gap-3 lg:flex-col lg:items-start ${className}`}>
      <Image
        src={GUIDE_AUTHOR.photo}
        alt={GUIDE_AUTHOR.name}
        width={44}
        height={44}
        className="h-11 w-11 flex-shrink-0 rounded-full border border-blue-gray object-cover"
        priority
      />
      <div className="font-sans text-[0.85rem] leading-snug">
        <p className="text-deep-ink">
          By <span className="font-semibold">{GUIDE_AUTHOR.name}</span>
        </p>
        <p className="text-slate">{GUIDE_AUTHOR.role}</p>
        <p className="mt-1 text-slate">{minutes} min read</p>
      </div>
    </div>
  );
}
