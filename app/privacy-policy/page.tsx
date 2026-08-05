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
  title: "Privacy Policy | Beacon House",
  description:
    "How Beacon House collects, uses, shares, and protects your personal information across our website, admissions consultations, and messaging channels.",
  path: "/privacy-policy",
});

const LAST_UPDATED = "5 August 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalHero
        eyebrow="Privacy Policy"
        headline={
          <>
            How we handle{" "}
            <em className="not-italic text-[var(--bh-warm-amber)]">
              your information
            </em>
          </>
        }
        subline="This policy explains what we collect, why we collect it, and the choices you have. It applies to our website, admissions consultations, and messaging channels."
      />

      <LegalBody lastUpdated={LAST_UPDATED}>
        <LegalP>
          This is a standard privacy policy for {COMPANY.brandName}, operated by{" "}
          {COMPANY.legalName}. We may refine the wording over time; the current
          version and its effective date are always shown above. By using our
          website or sharing your details with us, you agree to the practices
          described here.
        </LegalP>

        <LegalSection title="Information we collect">
          <LegalP>
            We only collect information that helps us respond to you and guide a
            student&apos;s admissions journey:
          </LegalP>
          <LegalList
            items={[
              "Contact details you provide - name, email address, and phone number - through our enquiry and application forms.",
              "Details about the student and family that you choose to share during a consultation, such as grade, curriculum, target universities, and academic interests.",
              "Messages you exchange with us over email, WhatsApp, or other channels.",
              "Basic technical and usage data your browser sends automatically, such as device type, approximate location, and pages viewed.",
            ]}
          />
        </LegalSection>

        <LegalSection title="How we use your information">
          <LegalP>We use the information you share to:</LegalP>
          <LegalList
            items={[
              "Respond to enquiries and schedule a Strategic Review or consultation.",
              "Provide our admissions advisory services and follow up on your application.",
              "Send relevant updates, reminders, and information about our programs.",
              "Improve our website and the quality of our services.",
              "Meet legal, accounting, and regulatory obligations.",
            ]}
          />
        </LegalSection>

        <LegalSection title="WhatsApp and messaging">
          <LegalP>
            We use WhatsApp and similar messaging services to communicate with
            families who reach out to us. If you contact us on WhatsApp or opt in
            to receive messages, we use your phone number and the contents of
            your messages to respond and to send updates related to your
            enquiry. Your use of WhatsApp is also governed by WhatsApp&apos;s own
            terms and privacy policy. You can ask us to stop messaging you at any
            time.
          </LegalP>
        </LegalSection>

        <LegalSection title="How we share your information">
          <LegalP>
            We do not sell your personal information. We share it only where
            needed to run our services:
          </LegalP>
          <LegalList
            items={[
              "Service providers who help us operate - for example, messaging platforms (such as WhatsApp Business API providers), form and hosting providers, and analytics tools - acting on our instructions.",
              "Admissions and academic partners directly involved in supporting a student's candidacy, only where relevant to the services you have engaged us for.",
              "Authorities or advisors where we are legally required to disclose information.",
            ]}
          />
        </LegalSection>

        <LegalSection title="Cookies and analytics">
          <LegalP>
            Our website may use cookies and similar technologies to keep the site
            working and to understand how visitors use it. You can control or
            disable cookies through your browser settings, though some parts of
            the site may not function as intended if you do.
          </LegalP>
        </LegalSection>

        <LegalSection title="Data retention">
          <LegalP>
            We keep your information for as long as needed to provide our
            services and to meet legal and record-keeping requirements. When it
            is no longer needed, we take reasonable steps to delete or anonymise
            it.
          </LegalP>
        </LegalSection>

        <LegalSection title="Data security">
          <LegalP>
            We take reasonable technical and organisational measures to protect
            your information against loss, misuse, and unauthorised access. No
            method of transmission or storage is completely secure, but we work
            to safeguard the data you entrust to us.
          </LegalP>
        </LegalSection>

        <LegalSection title="Students and minors">
          <LegalP>
            Our services often involve students who are minors. We rely on a
            parent or guardian to share a student&apos;s information and to
            consent to our use of it. If you believe a minor has provided us
            information without parental consent, please contact us and we will
            address it.
          </LegalP>
        </LegalSection>

        <LegalSection title="Your choices and rights">
          <LegalP>
            You can ask us to access, correct, or delete the personal
            information we hold about you, and you can opt out of our messages at
            any time. To make a request, reach us using the contact details
            below.
          </LegalP>
        </LegalSection>

        <LegalSection title="Third-party links">
          <LegalP>
            Our website may link to other sites we do not control. This policy
            does not cover those sites, and we encourage you to read their
            privacy policies.
          </LegalP>
        </LegalSection>

        <LegalSection title="Changes to this policy">
          <LegalP>
            We may update this policy from time to time. The latest version will
            always be posted on this page with a revised effective date.
          </LegalP>
        </LegalSection>

        <LegalSection title="Contact us">
          <LegalP>
            For any questions about this policy or your information, contact us
            at{" "}
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
