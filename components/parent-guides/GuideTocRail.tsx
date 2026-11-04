"use client";

import { useMemo } from "react";
import { useActiveSection } from "./useActiveSection";

// Desktop rail. Keeps the guide's title and the reader's place in view once
// the page title has scrolled away.
export default function GuideTocRail({
  guideTitle,
  items,
}: {
  guideTitle: string;
  items: { id: string; title: string }[];
}) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const active = useActiveSection(ids) ?? items[0]?.id;

  return (
    <div className="hidden lg:sticky lg:top-[100px] lg:block">
      <p className="font-serif text-[1.05rem] leading-snug text-deep-ink [text-wrap:balance]">
        {guideTitle}
      </p>
      <p className="mt-5 border-t border-blue-gray pt-4 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy">
        In this guide
      </p>
      <ol className="mt-3 space-y-0.5 border-l border-blue-gray">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-[0.85rem] leading-snug transition-colors hover:border-navy hover:text-deep-ink ${
                  isActive
                    ? "border-navy font-medium text-deep-ink"
                    : "border-transparent text-slate"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
