import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import RoleDetail from "@/components/careers/RoleDetail";
import JobPostingSchema from "@/components/careers/JobPostingSchema";
import { careerRoles, getRoleBySlug } from "@/lib/careers-data";

export function generateStaticParams() {
  return careerRoles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) return {};

  return buildMetadata({
    title: role.seoTitle,
    description: role.seoDescription,
    path: `/careers/${role.slug}`,
  });
}

export default async function CareerRolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  return (
    <>
      <JobPostingSchema role={role} />

      <section className="w-full bg-ivory">
        <div className="max-w-content mx-auto w-full px-6 md:px-8 lg:px-12 pb-24 md:pb-32 pt-28 md:pt-36">
          {/* Back link */}
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-navy underline underline-offset-4 hover:opacity-80"
          >
            <span aria-hidden>←</span> All open roles
          </Link>

          {/* Role header — no box. Meta inline, not a boxed dl. */}
          <header className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-sans text-sm">
              <span className="inline-flex items-center rounded-full bg-[var(--bh-warm-amber)]/15 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-deep-ink">
                {role.category}
              </span>
              <span className="text-slate/80">{role.type}</span>
              <span aria-hidden className="text-slate/40">·</span>
              <span className="text-slate/80">{role.mode}</span>
              <span aria-hidden className="text-slate/40">·</span>
              <span className="text-slate/80">{role.hoursChip}</span>
            </div>

            <h1 className="mt-4 font-serif text-3xl md:text-5xl lg:text-[3.2rem] leading-[1.1] text-deep-ink">
              {role.title}
            </h1>
            <div className="mt-5 h-0.5 w-12 bg-[var(--bh-warm-amber)]" />

            <p className="mt-5 text-slate leading-[1.85] md:text-[1.05rem]">
              {role.summary}
            </p>
            <p className="mt-3 text-sm leading-[1.7] text-slate/80">
              {role.availability}
            </p>

            {/* Primary CTA — anchor to the form below. */}
            <a
              href="#apply"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[var(--bh-warm-amber)] px-6 py-3 font-sans font-semibold text-deep-ink shadow-[0_10px_22px_rgba(20,33,61,0.2),0_3px_0_rgba(20,33,61,0.22)] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-[2px]"
            >
              Apply for this role
              <span aria-hidden className="text-base leading-none">↓</span>
            </a>
          </header>

          {/* Role narrative flows directly on the page. No wrapper box. */}
          <div className="mt-16 md:mt-24">
            <RoleDetail role={role} />
          </div>
        </div>
      </section>
    </>
  );
}
