import fs from "node:fs";
import path from "node:path";
import { guideHref, liveGuides, parentGuides } from "./parent-guides";

// Guide bodies live in content/parent-guides/<slug>.md, copied verbatim from
// the approved guide files (title, byline and internal notes removed). This
// splits one file into the parts the page lays out separately. The words are
// never changed; only links are added.

export interface GuideSection {
  id: string;
  title: string;
  markdown: string;
}

export interface GuideContent {
  intro: string;
  shortAnswer: string;
  sections: GuideSection[];
  sources?: { preface: string; items: string[] };
  authorBio: string;
  wordCount: number;
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normaliseQuotes = (s: string) =>
  s.replace(/[’‘]/g, "'").replace(/[“”]/g, '"');

// A guide names another guide by its title in quotes. Link it when that guide
// is live; leave the text as it is when it is not.
function linkGuideTitles(markdown: string, selfSlug: string) {
  let out = markdown;
  for (const guide of liveGuides()) {
    if (guide.slug === selfSlug) continue;
    const plain = normaliseQuotes(guide.title).replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );
    const flexible = plain.replace(/'/g, "['’]");
    const re = new RegExp(`([“"])(${flexible})([”"])`, "g");
    out = out.replace(
      re,
      (_m, open, title, close) =>
        `[${open}${title}${close}](${guideHref(guide.slug)})`,
    );
  }
  return out;
}

// Turn note markers such as [4] or [1–4] into links to the numbered source.
function linkNoteMarkers(markdown: string) {
  return markdown.replace(
    /\[(\d+)((?:[–-]\d+)?(?:,\s*\d+)*)\](?!\()/g,
    (_m, first, rest) => `[${first}${rest}](#source-${first})`,
  );
}

export function loadGuideContent(slug: string): GuideContent {
  const file = path.join(process.cwd(), "content", "parent-guides", `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");

  const parts = raw.split(/^## /m);
  const intro = parts[0].trim();
  let shortAnswer = "";
  let authorBio = "";
  let sources: GuideContent["sources"];
  const sections: GuideSection[] = [];

  for (const part of parts.slice(1)) {
    const newline = part.indexOf("\n");
    const title = part.slice(0, newline).trim();
    const body = part.slice(newline + 1).trim();

    if (title === "The short answer") {
      shortAnswer = body;
    } else if (title === "About the author") {
      authorBio = body;
    } else if (title === "Sources") {
      const lines = body.split("\n");
      const items: string[] = [];
      const preface: string[] = [];
      for (const line of lines) {
        if (line.startsWith("- ")) items.push(line.slice(2).trim());
        else if (line.trim() && items.length === 0) preface.push(line.trim());
      }
      sources = { preface: preface.join("\n\n"), items };
    } else {
      sections.push({
        id: slugify(title),
        title,
        markdown: linkNoteMarkers(linkGuideTitles(body, slug)),
      });
    }
  }

  return {
    intro: linkNoteMarkers(linkGuideTitles(intro, slug)),
    shortAnswer: linkNoteMarkers(shortAnswer),
    sections,
    sources,
    authorBio,
    wordCount: raw.split(/\s+/).filter(Boolean).length,
  };
}

export const readingMinutes = (words: number) => Math.max(1, Math.round(words / 220));

// Next guides in hub order, wrapping round. Live guides only.
export function nextGuides(slug: string, count = 3) {
  const live = liveGuides();
  const i = live.findIndex((g) => g.slug === slug);
  const out = [];
  for (let k = 1; k <= Math.min(count, live.length - 1); k++) {
    out.push(live[(i + k) % live.length]);
  }
  return out;
}

export const allGuideSlugs = () =>
  parentGuides.filter((g) => g.status === "live").map((g) => g.slug);
