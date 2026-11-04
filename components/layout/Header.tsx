"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import GuidesBanner from "@/components/layout/GuidesBanner";
import { NAV_LINKS, CTA_URL, CTA_LABEL } from "@/lib/constants";

export default function Header() {
  const [showMobileStickyCTA, setShowMobileStickyCTA] = useState(false);
  const [showHeaderCTA, setShowHeaderCTA] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = usePathname() === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const finalSection = document.querySelector("#final-cta");
      const finalRect = finalSection?.getBoundingClientRect();
      const isFinalVisible =
        !!finalRect &&
        finalRect.top < window.innerHeight &&
        finalRect.bottom > 0;

      const heroCTA = document.querySelector(".hero-cta");
      if (heroCTA) {
        const heroRect = heroCTA.getBoundingClientRect();
        const hasPassedHero = heroRect.bottom < 0;
        const isMobile = window.innerWidth < 768;

        setShowMobileStickyCTA(
          hasPassedHero && isMobile && !isFinalVisible
        );
        setShowHeaderCTA(hasPassedHero && !isMobile && !isFinalVisible);
      } else {
        setShowMobileStickyCTA(false);
        setShowHeaderCTA(false);
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-[var(--bh-warm-ivory)] shadow-sm"
            : "bg-transparent"
        }`}
      >
        {isHome && <GuidesBanner collapsed={scrolled} />}
        <div className="max-w-content mx-auto px-6 md:px-8 lg:px-12 h-[72px] md:h-[70px]">
          <div className="flex items-center justify-between h-full">
            <a href="/" className="flex items-center flex-shrink-0 mr-5 lg:mr-8" aria-label="Beacon House">
              <Image
                src="/bh-ig-logo.png"
                alt="Beacon House"
                width={140}
                height={32}
                className="h-6 sm:h-7 md:h-8 w-auto"
                priority
              />
            </a>

            {/* Eight links and the booking button do not fit one row. Once the
                booking button appears, the links fold into the menu button. */}
            <nav
              className={`hidden items-center space-x-5 xl:space-x-6 ${
                showHeaderCTA ? "" : "xl:flex"
              }`}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-[0.75rem] xl:text-[0.8125rem] font-medium text-[var(--bh-slate-text)] hover:text-[var(--bh-navy)] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div
              className={`hidden md:block md:ml-auto md:mr-3 xl:mr-0 ${
                showHeaderCTA ? "xl:mr-4" : "xl:hidden"
              }`}
            >
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-[var(--bh-warm-amber)] text-[var(--bh-deep-ink)] px-4 lg:px-5 xl:px-6 py-2.5 rounded-lg font-sans text-[0.75rem] lg:text-[0.8125rem] xl:text-sm font-semibold shadow-[0_10px_22px_rgba(20,33,61,0.24),0_3px_0_rgba(20,33,61,0.24)] transition-all duration-150 whitespace-nowrap ${
                  showHeaderCTA
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                } hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(20,33,61,0.28),0_4px_0_rgba(20,33,61,0.24)] active:translate-y-[2px]`}
              >
                {CTA_LABEL}
              </a>
            </div>

            <button
              className={`flex flex-col items-center justify-center w-10 h-10 gap-1.5 ${
                showHeaderCTA ? "" : "xl:hidden"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`block w-5 h-0.5 bg-[var(--bh-deep-ink)] transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-[var(--bh-deep-ink)] transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-[var(--bh-deep-ink)] transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`${showHeaderCTA ? "" : "xl:hidden"} bg-[var(--bh-warm-ivory)] border-t border-[var(--bh-border-blue-gray)]`}>
            <nav className="max-w-content mx-auto px-6 md:px-8 lg:px-12 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-sans text-base font-medium text-[var(--bh-slate-text)] hover:text-[var(--bh-navy)] py-3 border-b border-[var(--bh-border-blue-gray)]/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="xl:hidden mt-3 bg-[var(--bh-warm-amber)] text-[var(--bh-deep-ink)] px-6 py-3.5 rounded-lg font-sans font-semibold text-center shadow-[0_10px_22px_rgba(20,33,61,0.24),0_3px_0_rgba(20,33,61,0.24)]"
              >
                {CTA_LABEL}
              </a>
            </nav>
          </div>
        )}
      </header>

      {showMobileStickyCTA && (
        <div className="mobile-sticky-cta-bar fixed bottom-0 left-0 right-0 z-40 bg-[var(--bh-warm-ivory)]/70 backdrop-blur-md p-2 md:hidden animate-slide-in-down">
          <div className="px-3 pb-1">
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-press-hint w-full block text-center bg-[var(--bh-warm-amber)] text-[var(--bh-deep-ink)] py-3 rounded-lg font-sans font-semibold shadow-[0_11px_24px_rgba(20,33,61,0.26),0_3px_0_rgba(20,33,61,0.24)] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-[2px]"
            >
              {CTA_LABEL}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
