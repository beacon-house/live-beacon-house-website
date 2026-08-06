import type { CareerRole } from "@/lib/careers-data";
import { COMPANY, SITE_URL } from "@/lib/constants";

/**
 * JobPosting structured data. This is what makes a role eligible for the
 * Google Jobs box, which is the main organic channel for a careers page.
 *
 * baseSalary is deliberately omitted: it is optional in the schema, and
 * publishing a rate is not something we do.
 */
export default function JobPostingSchema({ role }: { role: CareerRole }) {
  const description = [
    `<p>${role.summary}</p>`,
    ...role.work.map((paragraph) => `<p>${paragraph}</p>`),
    "<p>You will fit if:</p>",
    `<ul>${role.fitFor.map((item) => `<li>${item}</li>`).join("")}</ul>`,
    `<p>${role.availability}</p>`,
    "<p>How to apply: CV, LinkedIn, and a short written answer. Teaching clip optional.</p>",
    `<p>Application question: ${role.screen.question}</p>`,
  ].join("");

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description,
    datePosted: role.datePosted,
    employmentType: role.employmentType,
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: COMPANY.brandName,
      sameAs: SITE_URL,
      logo: `${SITE_URL}/og-image.png`,
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "India",
    },
    url: `${SITE_URL}/careers/${role.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
