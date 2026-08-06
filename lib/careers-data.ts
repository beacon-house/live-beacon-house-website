export interface CareerRole {
  slug: string;
  title: string;
  category: string;
  type: string;
  employmentType: string;
  datePosted: string;
  mode: string;
  hoursChip: string;
  summary: string;
  work: string[];
  fitFor: string[];
  availability: string;
  /**
   * Written screen on the apply form. One question per role so future
   * non-tutor roles can swap this without a shared essay prompt.
   */
  screen: {
    question: string;
    helper: string;
    minChars: number;
    maxChars: number;
  };
  seoTitle: string;
  seoDescription: string;
}

/**
 * Filter chips on /careers. Add a category here and it appears once a role
 * carries it. Categories with no open roles are not rendered.
 */
export const CAREER_CATEGORIES = [
  "SAT",
  "AMC",
  "Counselling",
  "Operations",
] as const;

export const careersIntro = {
  heading: "Careers at Beacon House",
  body: "Small classes, diagnostic-led teaching, measured outcomes. Open roles below.",
};

export const applyCopy = {
  heading: "Apply",
  contactNote:
    "CV and LinkedIn for contact. The written answer is what we read first. Clip optional.",
  videoLabel: "Teaching clip (optional)",
  videoHelp:
    "Google Drive or YouTube (unlisted), set to “anyone with the link”. Skip if you don’t have one.",
  cvHelp: "PDF, up to 3MB.",
  screenLabel: "Your answer",
  screenPasteBlocked: "Paste is off. Type your answer.",
  closingLine: "We read every application.",
  howToApplyIntro:
    "No cover letter. CV, LinkedIn, and a short written answer. Clip optional.",
  howToApplySteps: [
    "Attach your CV and paste your LinkedIn.",
    "Answer the role question in your own words — that’s the main screen.",
    "Add a teaching clip link if you have one. If not, skip it.",
  ],
};

export const careerRoles: CareerRole[] = [
  // AMC is the active hire. SAT Math + English stay listed; can ramp next week.
  {
    slug: "amc-math",
    title: "Math Tutor for AMC 10 / 12",
    category: "AMC",
    type: "Part-time",
    employmentType: "PART_TIME",
    datePosted: "2026-08-06",
    mode: "Online",
    hoursChip: "Evenings or weekends",
    summary: "Contest maths, small group, problem-solving first.",
    work: [
      "Small live batches. Short concept, long supervised solving, timed mocks.",
      "You teach. Curriculum, question tagging, programme management handled for you.",
      "Mocks run on our platform — per-question timing and error data, so debriefs start from what went wrong, not the score.",
      "New line. Room to shape how sessions run if you have a view.",
    ],
    fitFor: [
      "Can live-solve mid-to-hard AMC 12 problems (back half of the paper).",
      "JEE or contest maths teaching background. Olympiad medals not required.",
      "Teach the path, not the solution.",
      "Comfortable with an early-stage programme.",
    ],
    availability:
      "Evenings or weekends, ~3-4 hrs/week to start. Contest is in November; batch runs to then.",
    screen: {
      question:
        "How do you teach contest maths (AMC / similar), and how is that different from JEE maths?",
      helper:
        "A real approach: how a session is structured, what students do in class, what you refuse to do. Concrete beats polished. ~150-250 words.",
      minChars: 120,
      maxChars: 2000,
    },
    seoTitle:
      "Math Tutor for AMC 10 / 12 (Part-time, Online) | Careers at Beacon House",
    seoDescription:
      "Part-time online contest maths role at Beacon House, AMC 10 and 12. Small batches, problem-solving first. Apply with CV, LinkedIn and a short written answer.",
  },
  {
    slug: "sat-math",
    title: "SAT Math Tutor",
    category: "SAT",
    type: "Part-time",
    employmentType: "PART_TIME",
    datePosted: "2026-08-06",
    mode: "Online",
    hoursChip: "Weekday evenings",
    summary: "1:1 SAT Math, small load, diagnostic-led.",
    work: [
      "You teach. Diagnostics, planning, question banks handled for you.",
      "Every mock returns per-question data — you walk in knowing which domains leak and whether it’s pace or content.",
      "4-5 students at a time, not 20. Enough to actually move a score.",
    ],
    fitFor: [
      "Think in score bands and domains, not chapters.",
      "Know the digital SAT, including adaptive module routing.",
      "Have a view on pace and timing, not just content.",
      "Teach method: backsolving, picking numbers, Desmos, grid-in discipline.",
    ],
    availability:
      "Weekday evenings 4-9 PM, some weekend slots. Bandwidth for 4-5 students.",
    screen: {
      question:
        "How do you teach SAT Math, and how is that different from school or JEE maths tutoring?",
      helper:
        "How you use mock data, what a class looks like, how you handle pace vs content gaps. ~150-250 words.",
      minChars: 120,
      maxChars: 2000,
    },
    seoTitle: "SAT Math Tutor (Part-time, Online) | Careers at Beacon House",
    seoDescription:
      "Part-time online SAT Math tutoring role at Beacon House. Small load, diagnostic-led. Apply with CV, LinkedIn and a short written answer.",
  },
  {
    slug: "sat-english",
    title: "SAT English Tutor",
    category: "SAT",
    type: "Part-time",
    employmentType: "PART_TIME",
    datePosted: "2026-08-06",
    mode: "Online",
    hoursChip: "Weekday evenings",
    summary: "1:1 SAT Reading & Writing, small load, diagnostic-led.",
    work: [
      "You teach. Diagnostics, planning, question banks handled for you.",
      "Every mock returns per-question data — you walk in knowing which question types cost marks and whether it’s pace or comprehension.",
      "4-5 students at a time, not 20. Enough to actually move a score.",
    ],
    fitFor: [
      "Think in score bands and question types, not chapters.",
      "Know the digital SAT, including adaptive module routing.",
      "Teach inference and rhetorical synthesis as method, not intuition.",
      "Have a view on pace and timing, not just content.",
    ],
    availability:
      "Weekday evenings 4-9 PM, some weekend slots. Bandwidth for 4-5 students.",
    screen: {
      question:
        "How do you teach SAT Reading & Writing, and how is that different from school English tuition?",
      helper:
        "How you break down question types, what a class looks like, how you move a student who’s “good at English” but stuck below their target. ~150-250 words.",
      minChars: 120,
      maxChars: 2000,
    },
    seoTitle: "SAT English Tutor (Part-time, Online) | Careers at Beacon House",
    seoDescription:
      "Part-time online SAT Reading & Writing tutoring role at Beacon House. Small load, diagnostic-led. Apply with CV, LinkedIn and a short written answer.",
  },
];

export function getRoleBySlug(slug: string): CareerRole | undefined {
  return careerRoles.find((role) => role.slug === slug);
}

export function activeCategories(): string[] {
  return CAREER_CATEGORIES.filter((category) =>
    careerRoles.some((role) => role.category === category),
  );
}
