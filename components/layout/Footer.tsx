"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  CTA_URL,
  CTA_LABEL,
  FOOTER_QUICK_LINKS,
  LEGAL_LINKS,
  COMPANY,
} from "@/lib/constants";

// Pages that already close with their own dedicated final-CTA section
// immediately before the footer — showing the footer's CTA there too
// would just repeat the same button the reader saw one scroll above.
const PATHS_WITH_OWN_FINAL_CTA = ["/our-story", "/our-results", "/our-program"];

function hasOwnFinalCTA(pathname: string) {
  return (
    PATHS_WITH_OWN_FINAL_CTA.includes(pathname) ||
    pathname.startsWith("/case-studies") ||
    pathname.startsWith("/parent-guides")
  );
}

export default function Footer() {
  const pathname = usePathname();
  const showCTA = !hasOwnFinalCTA(pathname);

  return (
    <footer className="bg-[var(--bh-deep-ink)] text-[var(--bh-warm-ivory)]">
      <div className="max-w-content mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">
          <div className="max-w-sm">
            <div className="inline-block bg-white rounded-md px-2.5 py-1.5 mb-4">
              <Image
                src="/bh-ig-logo.png"
                alt="Beacon House"
                width={140}
                height={32}
                className="h-6 md:h-7 w-auto"
              />
            </div>
            <p className="font-sans text-sm text-white/85 leading-relaxed">
              Premium Ivy League admissions consultancy for Indian students.
              Founder-supervised strategy, profile building, and candidacy
              development for selective universities.
            </p>
            <address className="not-italic mt-5 font-sans text-xs text-white/65 leading-relaxed">
              {COMPANY.address}
            </address>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-sm font-medium text-[var(--bh-warm-amber)] uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {showCTA && (
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-sm font-medium text-[var(--bh-warm-amber)] uppercase tracking-wider">
                Get Started
              </h3>
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[var(--bh-warm-amber)] text-[var(--bh-deep-ink)] px-6 py-3 rounded-lg font-sans font-semibold text-[0.95rem] shadow-[0_10px_22px_rgba(20,33,61,0.24),0_3px_0_rgba(20,33,61,0.24)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(20,33,61,0.28),0_4px_0_rgba(20,33,61,0.22)] active:translate-y-[2px] active:shadow-[0_4px_10px_rgba(20,33,61,0.2),0_1px_0_rgba(20,33,61,0.22)]"
              >
                {CTA_LABEL}
              </a>
            </div>
          )}
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className="font-sans text-xs text-white/65">
              © {new Date().getFullYear()} {COMPANY.brandName} by{" "}
              {COMPANY.legalName}. All rights reserved.
            </p>
            <nav className="flex items-center gap-4" aria-label="Legal">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-xs text-white/65 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <p className="font-sans text-xs text-white/65">
            In partnership with InGenius Prep — 150+ Former Admissions Officers
          </p>
        </div>
      </div>
    </footer>
  );
}
