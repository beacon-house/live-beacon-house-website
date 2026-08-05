export const SITE_URL = "https://beaconhouse.in";
export const CTA_URL = "https://admissions.beaconhouse.in/application-form";
export const CTA_LABEL = "Request a Strategic Review";

// Company legal details — surfaced in the footer, copyright line, and legal
// pages. Required for Meta/WhatsApp Business API verification.
// legalName + address confirmed against the official registration
// certificate shared by Karthik on 5 Aug 2026.
export const COMPANY = {
  brandName: "Beacon House",
  legalName: "Zenovate Consulting LLP",
  address:
    "2nd Floor, East Wing, 143 Campus 1A, RMZ Millenia Business Park, MGR Main Road, Perungudi, Chennai, Tamil Nadu 600096",
  contactEmail: "care@beaconhouse.in",
} as const;

// Privacy Policy + Terms & Conditions — linked in the footer.
export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "Our Leadership Team", href: "/our-leadership-team" },
  { label: "Our Program", href: "/our-program" },
  { label: "Our Results", href: "/our-results" },
  { label: "Case Studies", href: "/case-studies" },
] as const;

// Homepage section anchors — surfaced as quick links in the footer
// since they're not standalone pages.
export const FOOTER_QUICK_LINKS = [
  { label: "Why Beacon House", href: "/#why-different" },
  { label: "How We Build", href: "/#how-we-build" },
  { label: "The Journey", href: "/#journey" },
  { label: "FAQs", href: "/#faqs" },
] as const;
