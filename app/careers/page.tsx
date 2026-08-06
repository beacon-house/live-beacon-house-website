import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CareersBrowser from "@/components/careers/CareersBrowser";
import JobPostingSchema from "@/components/careers/JobPostingSchema";
import {
  activeCategories,
  careerRoles,
  careersIntro,
} from "@/lib/careers-data";

export const metadata: Metadata = buildMetadata({
  title: "Careers at Beacon House: Open Roles",
  description:
    "Open roles at Beacon House. Part-time online SAT and contest mathematics teaching positions. Small student loads, diagnostic-led teaching. Apply with a short teaching clip.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      {careerRoles.map((role) => (
        <JobPostingSchema key={role.slug} role={role} />
      ))}

      <section className="w-full bg-ivory">
        <div className="max-w-content mx-auto w-full px-6 md:px-8 lg:px-12 pb-20 md:pb-28 pt-28 md:pt-36">
          <header className="grid gap-8 lg:grid-cols-12 lg:gap-14 lg:items-end">
            <div className="lg:col-span-7">
              <span className="block font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--bh-warm-amber)] mb-3">
                We are hiring
              </span>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-[3.4rem] leading-[1.1] text-deep-ink">
                Careers at{" "}
                <span className="italic text-navy">Beacon House</span>
              </h1>
              <div className="mt-5 h-0.5 w-12 bg-[var(--bh-warm-amber)]" />
            </div>
            <p className="lg:col-span-5 text-slate leading-[1.85] lg:text-[1.05rem]">
              {careersIntro.body}
            </p>
          </header>

          <div className="mt-10 md:mt-14">
            <CareersBrowser
              roles={careerRoles}
              categories={activeCategories()}
            />
          </div>
        </div>
      </section>
    </>
  );
}
