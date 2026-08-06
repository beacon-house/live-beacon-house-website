"use client";

import { useState } from "react";
import Link from "next/link";
import type { CareerRole } from "@/lib/careers-data";

/**
 * Card grid on /careers. Each card links to /careers/[slug] — the hub is a
 * browse surface, not an expand-in-place reader. Filter chips stay client-side
 * for instant toggle; cards are hidden via CSS so server-rendered text stays
 * crawlable.
 */
export default function CareersBrowser({
  roles,
  categories,
}: {
  roles: CareerRole[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>("All");
  const chips = ["All", ...categories];

  return (
    <>
      <div className="flex flex-wrap gap-2.5">
        {chips.map((chip) => {
          const isActive = chip === active;
          return (
            <button
              key={chip}
              type="button"
              onClick={() => setActive(chip)}
              aria-pressed={isActive}
              className={[
                "rounded-full border px-5 py-2 font-sans text-sm font-semibold transition-colors",
                isActive
                  ? "border-deep-ink bg-deep-ink text-[var(--bh-warm-amber)]"
                  : "border-blue-gray bg-white text-slate hover:border-[var(--bh-warm-amber)] hover:text-deep-ink",
              ].join(" ")}
            >
              {chip}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => {
          const visible = active === "All" || role.category === active;
          return (
            <li
              key={role.slug}
              hidden={!visible}
              className="flex"
            >
              <Link
                href={`/careers/${role.slug}`}
                className="group flex w-full flex-col overflow-hidden rounded-xl border border-blue-gray bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[var(--bh-warm-amber)] hover:shadow-[0_18px_40px_rgba(20,33,61,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bh-warm-amber)]/40"
              >
                {/* Amber accent bar — site pattern. */}
                <div className="h-1 w-full bg-gradient-to-r from-[var(--bh-warm-amber)] to-[var(--bh-warm-amber-light)]" />

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="inline-flex w-fit items-center rounded-full bg-[var(--bh-warm-amber)]/15 px-3 py-1 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-deep-ink">
                    {role.category}
                  </span>

                  <h2 className="mt-4 font-serif text-xl md:text-[1.4rem] leading-tight text-deep-ink">
                    {role.title}
                  </h2>

                  <p className="mt-3 text-sm leading-[1.7] text-slate line-clamp-3">
                    {role.summary}
                  </p>

                  {/* Meta row */}
                  <dl className="mt-5 grid grid-cols-1 gap-2 border-t border-blue-gray/70 pt-4 text-sm">
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="font-sans text-xs uppercase tracking-[0.1em] text-slate/70">
                        Type
                      </dt>
                      <dd className="font-sans text-sm font-semibold text-deep-ink">
                        {role.type}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="font-sans text-xs uppercase tracking-[0.1em] text-slate/70">
                        Mode
                      </dt>
                      <dd className="font-sans text-sm font-semibold text-deep-ink">
                        {role.mode}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="font-sans text-xs uppercase tracking-[0.1em] text-slate/70">
                        When
                      </dt>
                      <dd className="font-sans text-sm font-semibold text-deep-ink text-right">
                        {role.hoursChip}
                      </dd>
                    </div>
                  </dl>

                  {/* CTA footer — pinned to bottom so cards align. */}
                  <span className="mt-6 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-navy transition-transform duration-200 group-hover:translate-x-1">
                    View role
                    <span aria-hidden className="text-base leading-none">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {roles.length === 0 ? (
        <p className="mt-10 text-slate">No open roles right now.</p>
      ) : null}
    </>
  );
}
