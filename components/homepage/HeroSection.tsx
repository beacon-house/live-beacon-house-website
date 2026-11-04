import CountUp from "@/components/shared/CountUp";
import { CTA_URL, CTA_LABEL } from "@/lib/constants";

const stats = [
  { target: 730, prefix: "", suffix: "+", label: "Cumulative Ivy League Admits" },
  { target: 159, prefix: "", suffix: "+", label: "Top 10 Admits In 2025-26" },
  { target: 100, prefix: "", suffix: "+", label: "Cumulative Top 5 UK Admits" },
  { target: 4, prefix: "$", suffix: "Mn+", label: "In Scholarships" },
];

function StatsGrid({ desktop = false }: { desktop?: boolean }) {
  return (
    <div
      className={`grid grid-cols-2 gap-2.5 md:gap-4 ${
        desktop ? "w-full max-w-[520px] justify-self-end" : "w-full md:w-max"
      }`}
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`flex flex-col justify-start bg-[var(--bh-deep-ink)] rounded-xl p-4 md:px-5 md:py-4 lg:px-6 lg:py-5 ring-1 ring-white/[0.06] border-t border-[var(--bh-warm-amber)]/20 ${
            desktop && index % 2 === 1 ? "md:translate-y-8" : ""
          }`}
        >
          <CountUp
            target={stat.target}
            prefix={stat.prefix}
            suffix={stat.suffix}
            className="font-serif font-medium text-[var(--bh-warm-amber)] text-[1.5rem] md:text-[1.75rem] xl:text-[2rem] leading-none mb-1 md:mb-1.5"
          />
          <span className="font-sans text-[var(--bh-warm-ivory)] text-[0.8125rem] md:text-[0.875rem] leading-snug">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="home-hero hero-gradient-bg relative w-full min-h-[100svh] md:h-[100dvh] flex flex-col justify-start md:justify-center overflow-hidden">
      <div className="relative z-10 w-full max-w-content mx-auto px-6 pt-[calc(88px_+_var(--guides-banner-h,0px))] pb-10 min-h-[100svh] flex flex-col justify-center md:min-h-0 md:px-8 md:pt-[calc(74px_+_var(--guides-banner-h,0px))] md:pb-5 lg:px-12 lg:pt-[calc(76px_+_var(--guides-banner-h,0px))] lg:pb-6 md:grid md:flex-1 md:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.78fr)] md:items-center md:gap-10 lg:gap-14">
        <div className="w-full max-w-[640px] xl:max-w-[690px]">
          <h1
            className="animate-fade-in-up font-serif font-medium tracking-tight text-[var(--bh-deep-ink)] mb-3 md:mb-3 lg:mb-4"
            style={{
              fontSize: "clamp(2.35rem, min(9.8vw, 7.6vh), 4.15rem)",
              lineHeight: "1.08",
              animationDelay: "0.1s",
            }}
          >
            The most selective university outcomes are rarely built in the{" "}
            <span className="text-[var(--bh-warm-amber)] italic">
              application year
            </span>
            .
          </h1>

          <p
            className="animate-fade-in-up font-sans text-[var(--bh-slate-text)] mb-6 md:mb-6 lg:mb-7"
            style={{
              fontSize: "clamp(0.95rem, min(2.7vw, 1.6vh), 1.08rem)",
              lineHeight: "1.62",
              animationDelay: "0.2s",
              maxWidth: "540px",
            }}
          >
            We help students build the direction, evidence and positioning that
            selective universities reward.
          </p>

          <div
            className="animate-fade-in-up mb-7 md:hidden"
            style={{ animationDelay: "0.3s" }}
          >
            <StatsGrid />
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta cta-press-hint w-full sm:w-auto inline-flex items-center justify-center bg-[var(--bh-warm-amber)] text-[var(--bh-deep-ink)] font-sans font-semibold text-[1rem] md:text-[1.02rem] px-7 md:px-8 py-3.5 rounded-lg shadow-[0_10px_22px_rgba(20,33,61,0.24),0_3px_0_rgba(20,33,61,0.24)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(20,33,61,0.28),0_4px_0_rgba(20,33,61,0.24)] active:translate-y-[2px] active:shadow-[0_4px_10px_rgba(20,33,61,0.2),0_1px_0_rgba(20,33,61,0.22)]"
            >
              {CTA_LABEL}
            </a>
          </div>
        </div>

        <div
          className="hidden animate-fade-in-up md:block"
          style={{ animationDelay: "0.3s" }}
        >
          <StatsGrid desktop />
        </div>
      </div>
    </section>
  );
}
