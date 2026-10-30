"use client";

import { useEffect, useMemo, useState } from "react";
import { useActiveSection } from "./useActiveSection";

// Phones: once the page title scrolls away, a slim bar under the site header
// shows which guide this is and the section being read. Tap to jump.
export default function GuideMobileBar({
  guideTitle,
  items,
}: {
  guideTitle: string;
  items: { id: string; title: string }[];
}) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const active = useActiveSection(ids);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const title = document.getElementById("guide-title");
      const final = document.getElementById("final-cta");
      const passedTitle = !!title && title.getBoundingClientRect().bottom < 72;
      const atEnd = !!final && final.getBoundingClientRect().top < window.innerHeight;
      setVisible(passedTitle && !atEnd);
      if (!passedTitle || atEnd) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = items.find((i) => i.id === active)?.title;

  return (
    <div
      className={`fixed left-0 right-0 top-[72px] z-40 border-b border-blue-gray bg-[var(--bh-warm-ivory)] transition-all duration-200 md:top-[70px] lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-[48px] w-full items-center justify-between gap-3 px-6 py-2 text-left md:px-8"
      >
        <span className="min-w-0">
          <span className="block truncate font-serif text-[0.95rem] leading-snug text-deep-ink">
            {guideTitle}
          </span>
          {current && (
            <span className="block truncate font-sans text-[0.75rem] text-slate">{current}</span>
          )}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-5 w-5 flex-shrink-0 text-navy transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ol className="max-h-[60vh] overflow-y-auto border-t border-blue-gray px-6 py-2 md:px-8">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block py-2 text-[0.92rem] leading-snug ${
                  item.id === active ? "font-semibold text-deep-ink" : "text-slate"
                }`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
