import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/constants";
import {
  LegalHero,
  LegalBody,
  LegalSection,
  LegalP,
  LegalList,
} from "@/components/legal/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions | Beacon House",
  description:
    "The terms that govern your use of the Beacon House website and admissions advisory services.",
  path: "/terms-and-conditions",
});

const LAST_UPDATED = "5 August 2026";

export default function TermsAndConditionsPage() {
  return (
    <>
      <LegalHero
        eyebrow="Terms & Conditions"
        headline={
          <>
            The terms of{" "}
            <em className="not-italic text-[var(--bh-warm-amber)]">
              working with us
            </em>
          </>
        }
        subline="These terms govern your use of our website and services. Please read them before engaging with Beacon House."
      />

      <LegalBody lastUpdated={LAST_UPDATED}>
        <LegalP>
          This is a standard set of terms for {COMPANY.brandName}, operated by{" "}
          {COMPANY.legalName}. We may refine the wording over time; the current
          version and its effective date are always shown above. By using our
          website or engaging our services, you agree to these terms.
        </LegalP>

        <LegalSection title="Our services">
          <LegalP>
            {COMPANY.brandName} provides admissions advisory and consulting
            services, including strategy, profile building, and candidacy
            development for selective universities. Our work is advisory. We
            guide and support each student&apos;s application, but admission
            decisions are made solely by the universities. We do not guarantee
            admission, scholarships, or any specific outcome.
          </LegalP>
        </LegalSection>

        <LegalSection title="Eligibility">
          <LegalP>
            Our services are intended for students and their families. Where a
            student is a minor, a parent or legal guardian must engage with us
            and accept these terms on the student&apos;s behalf.
          </LegalP>
        </LegalSection>

        <LegalSection title="Your responsibilities">
          <LegalP>When you use our website or services, you agree to:</LegalP>
          <LegalList
            items={[
              "Provide accurate and complete information, and keep it up to date.",
              "Use our website and services only for lawful purposes.",
              "Not misuse, disrupt, or attempt to gain unauthorised access to our website or systems.",
              "Respect our intellectual property and not copy or redistribute our materials without permission.",
            ]}
          />
        </LegalSection>

        <LegalSection title="Fees and payments">
          <LegalP>
            Where our services are provided for a fee, the applicable charges,
            scope, and payment terms will be set out separately in your
            engagement or agreement with us. Those specific terms apply
            alongside these general terms.
          </LegalP>
        </LegalSection>

        <LegalSection title="Intellectual property">
          <LegalP>
            All content on this website - including text, graphics, logos, and
            branding - belongs to {COMPANY.legalName} or its licensors and is
            protected by applicable laws. You may view the content for personal,
            non-commercial use, but you may not reproduce or distribute it
            without our written consent.
          </LegalP>
        </LegalSection>

        <LegalSection title="Third-party links and services">
          <LegalP>
            Our website and communications may reference or link to third-party
            websites and services, including messaging platforms such as
            WhatsApp. We do not control those services and are not responsible
            for their content or practices. Your use of them is governed by
            their own terms.
          </LegalP>
        </LegalSection>

        <LegalSection title="Limitation of liability">
          <LegalP>
            Our services and website are provided on an &quot;as is&quot; basis.
            To the extent permitted by law, {COMPANY.legalName} is not liable for
            any indirect or consequential loss arising from your use of our
            website or services, including any admissions outcome. Nothing in
            these terms limits liability that cannot be excluded under applicable
            law.
          </LegalP>
        </LegalSection>

        <LegalSection title="Governing law">
          <LegalP>
            These terms are governed by the laws of India, and any disputes will
            be subject to the jurisdiction of the courts at Chennai, Tamil Nadu.
          </LegalP>
        </LegalSection>

        <LegalSection title="Changes to these terms">
          <LegalP>
            We may update these terms from time to time. The latest version will
            always be posted on this page with a revised effective date.
            Continued use of our website or services means you accept the updated
            terms.
          </LegalP>
        </LegalSection>

        <LegalSection title="Contact us">
          <LegalP>
            For any questions about these terms, contact us at{" "}
            <a
              href={`mailto:${COMPANY.contactEmail}`}
              className="text-[var(--bh-navy)] underline underline-offset-2 hover:text-[var(--bh-warm-amber)] transition-colors"
            >
              {COMPANY.contactEmail}
            </a>
            . {COMPANY.legalName}, {COMPANY.address}.
          </LegalP>
        </LegalSection>
      </LegalBody>
    </>
  );
}
