"use client";

import { GUIDES_BANNER } from "@/lib/constants";

// Thin bar above the header on the home page. It folds away once the visitor
// scrolls, so it never shows next to the sticky booking button. Closing it or
// clicking through hides it for good on this browser. The inline script in
// app/layout.tsx adds `guides-banner-off` to <html> before first paint, so a
// returning visitor never sees it flash.
export function dismissGuidesBanner() {
  try {
    localStorage.setItem(GUIDES_BANNER.storageKey, "1");
  } catch {}
  document.documentElement.classList.add("guides-banner-off");
}

export default function GuidesBanner({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={`guides-banner overflow-hidden bg-[var(--bh-navy)] transition-[height] duration-300 ${
        collapsed ? "h-0" : "h-9"
      }`}
      aria-hidden={collapsed}
      inert={collapsed}
    >
      <div className="max-w-content mx-auto h-9 px-6 md:px-8 lg:px-12 flex items-center justify-center gap-3">
        <a
          href={GUIDES_BANNER.href}
          onClick={dismissGuidesBanner}
          className="min-w-0 truncate font-sans text-[0.75rem] md:text-[0.8125rem] text-[var(--bh-warm-ivory)]"
        >
          <span className="md:hidden">{GUIDES_BANNER.shortText} </span>
          <span className="hidden md:inline">{GUIDES_BANNER.text} </span>
          <span className="font-semibold text-[var(--bh-warm-amber-light)] underline underline-offset-2 hover:text-[var(--bh-warm-amber)]">
            {GUIDES_BANNER.linkLabel}&nbsp;&rarr;
          </span>
        </a>
        <button
          type="button"
          onClick={dismissGuidesBanner}
          aria-label="Close"
          className="flex-shrink-0 -mr-2 flex h-8 w-8 items-center justify-center rounded text-[var(--bh-warm-ivory)]/70 hover:text-[var(--bh-warm-ivory)]"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
