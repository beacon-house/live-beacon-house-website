"use client";

import { useEffect, useState } from "react";

// Desktop contents rail. Marks the section the reader is in, so a parent on a
// long guide can see where they are.
export default function GuideTocRail({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);

    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = headings[0]?.id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <div className="hidden lg:sticky lg:top-[104px] lg:block">
      <p className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-navy">
        In this guide
      </p>
      <ol className="mt-4 space-y-0.5 border-l border-blue-gray">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-[0.875rem] leading-snug transition-colors hover:border-navy hover:text-deep-ink ${
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
